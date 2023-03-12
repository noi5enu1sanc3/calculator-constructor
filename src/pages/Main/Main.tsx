import { DndContext, DragOverlay } from '@dnd-kit/core';
import { createPortal } from 'react-dom';

import CalculatorElement from '../../components/CalculatorBlocks/ConstructorElement/ConstructorElement';
import Canvas from '../../components/Canvas/Canvas';
import CalculatorBlocksContainer from '../../components/ConstructorBlocksContainer/ConstructorBlocksContainer';
import RuntimeContainer from '../../features/calculator/RuntimeContainer/RuntimeContainer';
import { useConstructor } from '../../features/dnd/hooks/useConstructor';
import { BlockId } from '../../features/dnd/utils/constants';
import { Mode } from '../../features/modeSwitcher/utils/constants';
import Sidebar from '../../layout/Sidebar/Sidebar';
import { useAppSelector } from '../../store/hook';

import styles from './Main.module.css';

function Main() {
  const constructorBlocks = [
    { id: BlockId.DISPLAY, wasDragged: false },
    { id: BlockId.OPERATORS, wasDragged: false },
    { id: BlockId.DIGITS, wasDragged: false },
    { id: BlockId.EQUALS, wasDragged: false },
  ];

  const {
    sensors,
    activeItem,
    handleDragEnd,
    handleDragStart,
    handleDragOver,
    handleRemoveFromCanvas,
    blocks,
    canvasBlocks,
  } = useConstructor(constructorBlocks);

  const currentMode = useAppSelector(({ modeState }) => modeState.mode);
  const runtimeBlocks = useAppSelector(({modeState}) => modeState.elementIds);
  const isConstructor = currentMode === Mode.CONSTRUCTOR;

  return (
    <main className={styles.main}>
      {isConstructor ? (
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
      ) : (
        <RuntimeContainer blockIds={canvasBlocks} />
      )}
    </main>
  );
}

export default Main;
