import {
  closestCorners,
  DndContext,
  DragCancelEvent,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  rectIntersection,
  useSensors,
  useSensor,
  PointerSensor,
  DragOverEvent,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

import CalculatorElement from '../../components/CalculatorBlocks/CalculatorElement/CalculatorElement';
import CalculatorBlocksContainer from '../../components/CalculatorBlocksContainer/CalculatorBlocksContainer';
import Canvas from '../../components/Canvas/Canvas';
import { BlockId, DROPPABLE_ID, LOCKED_BLOCKS } from '../../utils/constants';
import { CalculatorBlock } from '../../utils/types';
import Sidebar from '../Sidebar/Sidebar';

import styles from './Main.module.css';

function Main() {
  const [blocks, setBlocks] = useState<CalculatorBlock[]>([
    { id: BlockId.Display, wasDragged: false },
    { id: BlockId.Operators, wasDragged: false },
    { id: BlockId.Digits, wasDragged: false },
    { id: BlockId.Equals, wasDragged: false },
  ]);
  const [canvasBlocks, setCanvasBlocks] = useState<CalculatorBlock[]>([]);

  const [activeItem, setActiveItem] = useState<CalculatorBlock | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 150,
        tolerance: 5,
      },
    })
  );

  useEffect(() => {
    setBlocks((prev) => {
      const updatedBlocks = prev.map((item) => {
        if (canvasBlocks.some((block) => block.id === item.id)) {
          return {
            ...item,
            wasDragged: true,
          };
        } else {
          return {
            ...item,
            wasDragged: false,
          };
        }
      });
      return updatedBlocks as CalculatorBlock[];
    });
  }, [canvasBlocks]);

  function handleDragStart(event: DragStartEvent) {
    const target = blocks.find((el) => el.id === event.active.id);
    if (target) setActiveItem(target);
  }

  function handleDragOver(event: DragOverEvent) {
    const { over, active } = event;

    const isSorting = canvasBlocks.some((block) => block.id === active.id);

    if (!over || !active || isSorting || over.id === active.id) return;

    const isDraggedIntoBlankCanvas = over.id === DROPPABLE_ID;

    setCanvasBlocks((prev) => {
      let newIndex;
      if (isDraggedIntoBlankCanvas) {
        newIndex = prev.length + 1;
      } else if (prev.some((block) => block.id === over.id)) {
        const overElem = prev.find((block) => block.id === over.id);
        if (overElem) {
          const overIndex = prev.indexOf(overElem);
          const isAfterLast = over && overIndex === prev.length - 1;
          const modifier = isAfterLast ? 1 : 0;
          newIndex = overIndex >= 0 ? overIndex + modifier : prev.length + 1;
        }
      }

      return [
        ...prev.slice(0, newIndex),
        blocks.find((b) => b.id === active.id),
        ...prev.slice(newIndex, prev.length),
      ] as CalculatorBlock[];
    });
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    const isMovingFromSidebar = !canvasBlocks.find((block) => block.id === active.id);

    if (!over || !active || isMovingFromSidebar) {
      return;
    }

    const activeItem = canvasBlocks.find((item) => item.id === active.id);
    const overItem = canvasBlocks.find((item) => item.id === over.id);

    if (!activeItem || !overItem) return;

    const isChangingPosition = canvasBlocks.indexOf(activeItem) !== canvasBlocks.indexOf(overItem);

    if (isChangingPosition) {
      if (LOCKED_BLOCKS.includes(active.id as BlockId)) {
        setCanvasBlocks((prev) =>  [blocks.find((b) => b.id === active.id), ...prev.filter((i) => i.id!==active.id)] as CalculatorBlock[]
        );
      } else
        setCanvasBlocks((items) => arrayMove(items, canvasBlocks.indexOf(activeItem), canvasBlocks.indexOf(overItem)));
    }

    setActiveItem(null);
  }

  function handleDragCancel(event: DragCancelEvent) {
    //setCanvasBlocks(reserveCanvasContainer);
  }

  function handleRemoveFromCanvas(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const removeId = event.currentTarget.id;
    console.log(event.currentTarget)
    setCanvasBlocks((prev) => prev.filter((item) => item.id !== removeId));
  }

  return (
    <main className={styles.main}>
      <DndContext
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragCancel={handleDragCancel}
        collisionDetection={activeItem && activeItem.wasDragged ? closestCorners : rectIntersection} //wrong?
        sensors={sensors}
      >
        <Sidebar>
          <CalculatorBlocksContainer blocks={blocks} />
        </Sidebar>
        <Canvas canvasBlocks={canvasBlocks} onRemove={handleRemoveFromCanvas} />
        {createPortal(
          <DragOverlay>{activeItem ? <CalculatorElement id={activeItem.id} /> : null}</DragOverlay>,
          document.body
        )}
      </DndContext>
    </main>
  );
}

export default Main;
