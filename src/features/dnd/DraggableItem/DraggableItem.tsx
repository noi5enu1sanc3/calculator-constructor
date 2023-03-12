import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

import Item from '../Item/Item';

type Props = {
  id: string;
  children: JSX.Element;
  onRemove?(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
};

function DraggableItem({ id, children, onRemove }: Props) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: id });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <Item ref={setNodeRef} {...attributes} {...listeners} onRemove={onRemove} style={style} id={id}>
      {children}
    </Item>
  );
}

export default DraggableItem;
