import { DndContext, DragOverlay } from '@dnd-kit/core';
import { createPortal } from 'react-dom';

import RuntimeContainer from '../../features/calculator/RuntimeContainer/RuntimeContainer';
import Canvas from '../../features/dnd/Canvas/Canvas';
import DraggablesContainer from '../../features/dnd/DraggablesContainer/DraggablesContainer';
import { useConstructor } from '../../features/dnd/hooks/useConstructor';
import { BlockId } from '../../features/dnd/utils/constants';
import { Mode } from '../../features/modeSwitcher/utils/constants';
import Content from '../../layout/Content/Content';
import Sidebar from '../../layout/Sidebar/Sidebar';
import CalculatorElement from '../../shared/Blocks/ConstructorElement/ConstructorElement';
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
  const isConstructor = currentMode === Mode.CONSTRUCTOR;

  return (
    <main className={styles.main}>
      {isConstructor ? (
        <DndContext
          onDragEnd={handleDragEnd}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          sensors={sensors}
        >
          <Sidebar>
            <DraggablesContainer blocks={blocks} />
          </Sidebar>

          <Content>
            <Canvas canvasBlocks={canvasBlocks} onRemove={handleRemoveFromCanvas} />
          </Content>
          {createPortal(
            <DragOverlay>{activeItem ? <CalculatorElement id={activeItem.id} isDragging={true}/> : null}</DragOverlay>,
            document.body
          )}
        </DndContext>
      ) : (
        <Content>
          <RuntimeContainer blockIds={canvasBlocks} />
        </Content>
      )}
    </main>
  );
}

export default Main;
