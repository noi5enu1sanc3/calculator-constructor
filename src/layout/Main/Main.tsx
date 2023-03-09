import { closestCorners, DndContext, DragEndEvent, DragStartEvent, rectIntersection } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { useState } from 'react';

import DigitsBlock from '../../components/CalculatorBlocks/DigitsBlock/DigitsBlock';
import DisplayBlock from '../../components/CalculatorBlocks/DisplayBlock/DisplayBlock';
import EqualsButtonBlock from '../../components/CalculatorBlocks/EqualsButtonBlock/EqualsButtonBlock';
import OperatorsBlock from '../../components/CalculatorBlocks/OperatorsBlock/OperatorsBlock';
import CalculatorBlocksContainer from '../../components/CalculatorBlocksContainer/CalculatorBlocksContainer';
import Canvas from '../../components/Canvas/Canvas';
import Sidebar from '../../components/Sidebar/Sidebar';
import { BlockId } from '../../utils/constants';
import { CalculatorBlock } from '../../utils/types';

import styles from './Main.module.css';

function Main() {
  const blocks = [
    { element: <DisplayBlock />, id: BlockId.Display },
    { element: <OperatorsBlock />, id: BlockId.Operators },
    { element: <DigitsBlock />, id: BlockId.Digits },
    { element: <EqualsButtonBlock />, id: BlockId.Equals },
  ];

  const [canvasBlocks, setCanvasBlocks] = useState<CalculatorBlock[]>([]);

  const [isDropped, setIsDropped] = useState(false);
  const [activeItem, setActiveItem] = useState('');

  function handleDragStart(event: DragStartEvent) {
    const target = blocks.find((el) => el.id === event.active.id);
    console.log('target ', target);
    if (target) setActiveItem(target.id);
  }

  function handleDragEnd(event: DragEndEvent) {
    console.log(canvasBlocks);
    console.log('blocks ', blocks);
    if (event.over && event.over.id === 'canvas') {
      setIsDropped(true);
      const target = blocks.find((el) => el.id === event.active.id);
      if (target) {
        const droppedEl = { ...target, id: `CANVAS_${event.active.id}` };
        const temp = [...canvasBlocks];
        if (droppedEl && !canvasBlocks.some((el) => el.id === `CANVAS_${event.active.id}`)) {
          temp.push(droppedEl);
          setCanvasBlocks(temp);
        }
      }
      // if(droppedEl)  droppedEl.id = `CANVAS_${event.active.id}`;
    }
    if (event.over && event.active.id !== event.over.id) {
      const activeEl = canvasBlocks.find((el) => el.id === event.active.id);
      const overEl = canvasBlocks.find((el) => el.id === event.over?.id);
      console.log(activeEl, overEl);
      if (activeEl && overEl) {
        const activeIndex = canvasBlocks.indexOf(activeEl);
        const overIndex = canvasBlocks.indexOf(overEl);
        console.log(activeIndex, overIndex);
        setCanvasBlocks(arrayMove(canvasBlocks, activeIndex, overIndex));
      }
    }
  }
  return (
    <main className={styles.main}>
      <DndContext
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
        collisionDetection={canvasBlocks.some((el) => el.id.includes(activeItem)) ? closestCorners : rectIntersection}
      >
        <Sidebar>
          <CalculatorBlocksContainer blocks={blocks} />
        </Sidebar>
        <Canvas canvasBlocks={canvasBlocks} />
      </DndContext>
    </main>
  );
}

export default Main;
