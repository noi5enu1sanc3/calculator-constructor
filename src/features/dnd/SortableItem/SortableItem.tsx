import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import CalculatorBlockItem from '../../../components/CalculatorBlocks/CalculatorBlockItem/CalculatorBlockItem';
import { BlockId, LOCKED_BLOCKS } from '../utils/constants';

type Props = {
  id: string;
  children: JSX.Element;
  onRemove?(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
};

function SortableItem({ id, children, onRemove }: Props) {
  const isLocked = LOCKED_BLOCKS.includes(id as BlockId);
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: id, disabled: isLocked });

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
