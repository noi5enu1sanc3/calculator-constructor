import {
  closestCorners,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  rectIntersection,
  useSensors,
  useSensor,
  PointerSensor,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { useState } from 'react';
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
        delay: 100,
        tolerance: 5,
      },
    })
  );

  function handleDragStart(event: DragStartEvent) {
    const target = blocks.find((el) => el.id === event.active.id);
    if (target) setActiveItem(target);
  }

  function handleDragEnd(event: DragEndEvent) {
    console.log(event);
    const { over, active } = event;
    const activeEl = blocks.find((el) => el.id === active.id);
    const overEl = blocks.find((el) => el.id === over?.id);

    if (!activeEl || !over || !activeItem) return;

    const isDraggedIntoBlankCanvas = over.id === 'canvas';
    const isDraggedOntoElement = active.id !== over.id && over.id !== 'canvas' && !activeItem.wasDragged;
    const isMovingInsideCanvas = overEl && active.id !== over.id && activeItem.wasDragged;

    if (isDraggedIntoBlankCanvas) {
      const updatedBlocks = blocks.map((block) => (block.id === active.id ? { ...block, wasDragged: true } : block));
      setBlocks(updatedBlocks);
      const targetBlock = updatedBlocks.find((block) => block.id === active.id);
      if (targetBlock) setCanvasBlocks((prev) => [...prev, targetBlock]);
    }

    if (isDraggedOntoElement) {
      const updatedBlocks = blocks.map((block) => (block.id === active.id ? { ...block, wasDragged: true } : block));
      setBlocks(updatedBlocks);
      const targetBlock = updatedBlocks.find((block) => block.id === active.id);
      if (targetBlock) setCanvasBlocks((prev) => [...prev, targetBlock]);
      const before = canvasBlocks.slice(
        0,
        canvasBlocks.findIndex((el) => el.id === over.id)
      );
      const after = canvasBlocks.slice(canvasBlocks.findIndex((el) => el.id === over.id));
      if (targetBlock) setCanvasBlocks([...before, targetBlock, ...after]);
    }

    if (isMovingInsideCanvas) {
      const activeIndex = canvasBlocks.indexOf(activeEl);
      const overIndex = canvasBlocks.indexOf(overEl);
      const updatedCanvasBlocks = arrayMove(canvasBlocks, overIndex, activeIndex);
      setCanvasBlocks(updatedCanvasBlocks);
    }

    //setActiveItem(null);
  }

  function handleRemoveFromCanvas(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    console.log(e.currentTarget);
    console.log('double clicked');
    console.log(activeItem);
    if (activeItem) {
      //const target = canvasBlocks.find(item => item.id === activeItem.id);
      const updatedCanvasBlocks: CalculatorBlock[] = [];
      canvasBlocks.forEach((block) => {
        if (block.id !== activeItem.id) updatedCanvasBlocks.push(block);
      });

      const updatedBlocks = blocks.map((block) => (block.id === activeItem.id ? { ...block, wasDragged: false } : block));
      setBlocks(updatedBlocks);
      setCanvasBlocks(updatedCanvasBlocks)
    }
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

  return (
    <main className={styles.main}>
      <DndContext
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
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
