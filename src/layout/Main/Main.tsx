import { closestCorners, DndContext, DragEndEvent, DragOverlay, DragStartEvent, rectIntersection } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { useState } from 'react';
import { createPortal } from 'react-dom';

import DigitsBlock from '../../components/CalculatorBlocks/DigitsBlock/DigitsBlock';
import DisplayBlock from '../../components/CalculatorBlocks/DisplayBlock/DisplayBlock';
import EqualsButtonBlock from '../../components/CalculatorBlocks/EqualsButtonBlock/EqualsButtonBlock';
import OperatorsBlock from '../../components/CalculatorBlocks/OperatorsBlock/OperatorsBlock';
import CalculatorBlocksContainer from '../../components/CalculatorBlocksContainer/CalculatorBlocksContainer';
import Canvas from '../../components/Canvas/Canvas';
import { CalculatorBlock } from '../../utils/types';
import Sidebar from '../Sidebar/Sidebar';

import styles from './Main.module.css';

function Main() {
  const [blocks, setBlocks] = useState([
    { element: <DisplayBlock />, id: 'DISPLAY', wasDragged: false },
    { element: <OperatorsBlock />, id: 'OPERATORS', wasDragged: false },
    { element: <DigitsBlock />, id: 'DIGITS', wasDragged: false },
    { element: <EqualsButtonBlock />, id: 'EQUALS', wasDragged: false }, //findById
  ]);



  // const [draggedBlocks, setDraggedBlocks] = useState<CalculatorBlock[]>([]);

  // const [isDropped, setIsDropped] = useState(false);

  const [activeItem, setActiveItem] = useState<CalculatorBlock | null>(null);

  function handleDragStart(event: DragStartEvent) {
    const target = blocks.find((el) => el.id === event.active.id);
    console.log('target ', target);
    if (target) setActiveItem(target);
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveItem(null);
    console.log('draggedBlocks ', draggedBlocks);
    console.log('blocks ', blocks);
    if (event.over && event.over.id === 'canvas') {
      setBlocks(
        blocks.map((block) => {
          if (block.id === event.active.id) {
            return {
              ...block,
              wasDragged: true,
              // id: `DISABLED_${block.id}`,
            };
          } else {
            return block;
          }
        })
      );
      console.log('blocks: ', blocks, 'dragged: ', draggedBlocks);
    }

    if (event.over && event.active.id !== event.over.id) {
      const activeEl = draggedBlocks.find((el) => el.id === event.active.id);
      const overEl = draggedBlocks.find((el) => el.id === event.over?.id);
      if (activeEl && overEl) {
        const activeIndex = draggedBlocks.indexOf(activeEl);
        const overIndex = draggedBlocks.indexOf(overEl);
        arrayMove(draggedBlocks, activeIndex, overIndex);
      }
    }
  }

  const draggedBlocks = blocks.filter((block) => block.wasDragged);
  return (
    <main className={styles.main}>
      <DndContext
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
        collisionDetection={activeItem && activeItem.id.includes('CANVAS') ? closestCorners : rectIntersection} //wrong?
      >
        <Sidebar>
          <CalculatorBlocksContainer blocks={blocks} />
        </Sidebar>
        <Canvas canvasBlocks={draggedBlocks} />
        {createPortal(<DragOverlay>{activeItem ? activeItem.element : null}</DragOverlay>, document.body)}
      </DndContext>
    </main>
  );
}

export default Main;
