import { DndContext, DragOverlay } from '@dnd-kit/core';
import { createPortal } from 'react-dom';

import ConstructorElement from '../../../shared/Blocks/ConstructorElement/ConstructorElement';
import { useConstructor } from '../hooks/useConstructor';
import { BlockId } from '../utils/constants';


type Props = {
  children: JSX.Element;
};

function DndContainer({ children }: Props) {
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
    handleDragCancel,
    handleDragOver,
  } = useConstructor(constructorBlocks);

  return (
    <DndContext
      onDragEnd={handleDragEnd}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragCancel={handleDragCancel}
      sensors={sensors}
    >
      {children}
      {createPortal(
        <DragOverlay>{activeItem ? <ConstructorElement id={activeItem.id} /> : null}</DragOverlay>,
        document.body
      )}
    </DndContext>
  );
}

export default DndContainer;
