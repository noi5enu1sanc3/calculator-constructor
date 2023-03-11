import {
  DndContext,
  DragOverlay,
} from '@dnd-kit/core';
import { createPortal } from 'react-dom';

import CalculatorElement from '../../components/CalculatorBlocks/CalculatorElement/CalculatorElement';
import CalculatorBlocksContainer from '../../components/CalculatorBlocksContainer/CalculatorBlocksContainer';
import Canvas from '../../components/Canvas/Canvas';
import { useConstructor } from '../../features/dnd/hooks/useConstructor';
import { BlockId } from '../../utils/constants';
import Sidebar from '../Sidebar/Sidebar';

import styles from './Main.module.css';

function Main() {
  const constructorBlocks = [
    { id: BlockId.Display, wasDragged: false },
    { id: BlockId.Operators, wasDragged: false },
    { id: BlockId.Digits, wasDragged: false },
    { id: BlockId.Equals, wasDragged: false },
  ];

  const {
    sensors,
    activeItem,
    handleDragEnd,
    handleDragStart,
    handleDragOver,
    handleRemoveFromCanvas,
    blocks,
    canvasBlocks
  } = useConstructor(constructorBlocks);

  return (
    <main className={styles.main}>
      <DndContext
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        // collisionDetection={activeItem && activeItem.wasDragged ? closestCorners : rectIntersection} //wrong?
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
