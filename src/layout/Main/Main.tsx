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

import DigitsBlock from '../../components/CalculatorBlocks/DigitsBlock/DigitsBlock';
import DisplayBlock from '../../components/CalculatorBlocks/DisplayBlock/DisplayBlock';
import EqualsButtonBlock from '../../components/CalculatorBlocks/EqualsButtonBlock/EqualsButtonBlock';
import OperatorsBlock from '../../components/CalculatorBlocks/OperatorsBlock/OperatorsBlock';
import CalculatorBlocksContainer from '../../components/CalculatorBlocksContainer/CalculatorBlocksContainer';
import Canvas from '../../components/Canvas/Canvas';
import { BlockId } from '../../utils/constants';
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
        if (canvasBlocks.some((block) => block.id.includes(item.id))) {
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
    console.log(canvasBlocks, blocks)
  }, [canvasBlocks]);

  function handleDragStart(event: DragStartEvent) {
    const target = blocks.find((el) => el.id === event.active.id);
    if (target) setActiveItem(target);
  }

  function handleDragOver(event: DragOverEvent) {
    const { over, active } = event;
    console.log(over);

    const targetBlock = canvasBlocks.find((block) => block.id === active.id); //if already there return

    if (!over || !active || targetBlock || over.id === active.id) return;

    const isDraggedIntoBlankCanvas = over.id === 'canvas';

    console.log(over.id);

    setCanvasBlocks((prev) => {
      let newIndex;
      if (isDraggedIntoBlankCanvas) {
        newIndex = prev.length + 1;
        console.log('1111')
      } else if (prev.some((block) => block.id === over.id)) {
        console.log('1111')
        const overElem = prev.find((block) => block.id === over.id);
        console.log(overElem)
        if (overElem) {
          const overIndex = prev.indexOf(overElem);
          const isAfterLast = over && overIndex === prev.length - 1;
          const modifier = isAfterLast ? 1 : 0;
          newIndex = overIndex >= 0 ? overIndex + modifier : prev.length + 1;
          console.log(newIndex);
        }
      }
      return [
        ...prev.slice(0, newIndex),
        blocks.find((b) => b.id === active.id),
        ...prev.slice(newIndex, prev.length),
      ] as CalculatorBlock[];
    });
    console.log(canvasBlocks)

    // if(isDraggedIntoBlankCanvas && !isOnCanvas) {
    //   const targetBlock = blocks.find((block) => block.id === active.id);
    //   if (targetBlock) setCanvasBlocks((prev) => [...prev, targetBlock]);
    // }

    // if (active.id !== over.id) {
    //   const targetBlock = blocks.find((block) => block.id === active.id);

    //   const before = canvasBlocks.slice(
    //     0,
    //     canvasBlocks.findIndex((el) => el.id === over.id)
    //   );
    //   const after = canvasBlocks.slice(canvasBlocks.findIndex((el) => el.id === over.id));
    //   if (targetBlock) setCanvasBlocks([...before, targetBlock, ...after]);
    // }
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over || !active || !canvasBlocks.find((block) => block.id === active.id)) {
      return;
    }

    const activeItem = canvasBlocks.find((item) => item.id === active.id);
    const overItem = canvasBlocks.find((item) => item.id === over.id);

    if (!activeItem || !overItem) return;

    if (canvasBlocks.indexOf(activeItem) !== canvasBlocks.indexOf(overItem)) {
      setCanvasBlocks((items) => arrayMove(items, canvasBlocks.indexOf(activeItem), canvasBlocks.indexOf(overItem)));
    }

    setActiveItem(null);
  }

  function handleDragCancel(event: DragCancelEvent) {
    //setCanvasBlocks(reserveCanvasContainer);
  }

  // function handleDragEnd(event: DragEndEvent) {
  //   //setCanvasBlocks(reserveCanvasContainer);
  //   const { over, active } = event;
  //   console.log(over, active);
  //   const activeEl = blocks.find((el) => el.id === active.id);
  //   const overEl = blocks.find((el) => el.id === over?.id);

  //   if (!activeEl || !over || !activeItem) return;

  //   const isDraggedIntoBlankCanvas = over.id === 'canvas';
  //   const isDraggedOntoElement = active.id !== over.id && over.id !== 'canvas' && !activeItem.wasDragged;
  //   const isSortingCanvas = overEl && active.id !== over.id && activeItem.wasDragged;

  //   if (isDraggedIntoBlankCanvas) {
  //     const updatedBlocks = blocks.map((block) => (block.id === active.id ? { ...block, wasDragged: true } : block));
  //     setBlocks(updatedBlocks);
  //     const targetBlock = updatedBlocks.find((block) => block.id === active.id);
  //     if (targetBlock) setCanvasBlocks((prev) => [...prev, targetBlock]);
  //   }

  //   if (isDraggedOntoElement) {
  //     const updatedBlocks = blocks.map((block) => (block.id === active.id ? { ...block, wasDragged: true } : block));
  //     setBlocks(updatedBlocks);
  //     const targetBlock = updatedBlocks.find((block) => block.id === active.id);
  //     if (targetBlock) setCanvasBlocks((prev) => [...prev, targetBlock]);
  //     const before = canvasBlocks.slice(
  //       0,
  //       canvasBlocks.findIndex((el) => el.id === over.id)
  //     );
  //     const after = canvasBlocks.slice(canvasBlocks.findIndex((el) => el.id === over.id));
  //     if (targetBlock) setCanvasBlocks([...before, targetBlock, ...after]);
  //   }

  //   if (isSortingCanvas) {
  //     const activeIndex = canvasBlocks.indexOf(activeEl);
  //     const overIndex = canvasBlocks.indexOf(overEl);
  //     const updatedCanvasBlocks = arrayMove(canvasBlocks, activeIndex, overIndex);
  //     setCanvasBlocks(updatedCanvasBlocks);
  //   }

  //   setActiveItem(null);
  // }

  function handleRemoveFromCanvas(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const removeId = event.currentTarget.id;
    setCanvasBlocks((prev) => prev.filter((item) => item.id !== removeId));
  }

  const renderBlock = (id: BlockId) => {
    switch (id) {
      case BlockId.Display:
        return <DisplayBlock />;
      case BlockId.Operators:
        return <OperatorsBlock />;
      case BlockId.Digits:
        return <DigitsBlock />;
      case BlockId.Equals:
        return <EqualsButtonBlock />;
    }
  };

  function checkIsOnCanvas (id: BlockId) {
    canvasBlocks.some((item) => item.id === id);
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
        {createPortal(<DragOverlay>{activeItem ? renderBlock(activeItem.id) : null}</DragOverlay>, document.body)}
      </DndContext>
    </main>
  );
}

export default Main;
