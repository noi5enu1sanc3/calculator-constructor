import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import CalculatorBlockItem from '../../../components/CalculatorBlocks/CalculatorBlockItem/CalculatorBlockItem';

type Props = {
  id: string;
  children: JSX.Element;
  onRemove?(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
};

function DraggableItem({ id, children, onRemove }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <CalculatorBlockItem ref={setNodeRef} {...attributes} {...listeners} onRemove={onRemove} style={style} id={id}>
      {children}
    </CalculatorBlockItem>
  );
}

export default DraggableItem;
