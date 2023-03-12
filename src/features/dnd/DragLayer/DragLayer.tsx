import { DragOverlay } from '@dnd-kit/core';

type Props = {
  children: JSX.Element;
};

function DragLayer({ children }: Props) {
  return <DragOverlay>
    {children}
  </DragOverlay>;
}

export default DragLayer;
