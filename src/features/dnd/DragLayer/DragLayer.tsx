import { DragOverlay } from '@dnd-kit/core';

import ConstructorElement from '../../../shared/Blocks/ConstructorElement/ConstructorElement';
import { BlockId } from '../utils/constants';

type Props = {
  children: JSX.Element;
};

function DragLayer({ children }: Props) {
  return <DragOverlay>
    {children}
  </DragOverlay>;
}

export default DragLayer;
