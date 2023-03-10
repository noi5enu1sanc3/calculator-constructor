import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import CalculatorBlockItem from '../../../components/CalculatorBlocks/CalculatorBlockItem/CalculatorBlockItem';
import ItemPlaceholder from '../../../components/UI/ItemPlaceholder/ItemPlaceholder';

type Props = {
  id: string;
  children: JSX.Element;
  onRemove?(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
};

function SortableItem({ id, children, onRemove }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: id });

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

export default SortableItem;
