import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import CalculatorBlockItem from '../../../components/CalculatorBlocks/CalculatorBlockItem/CalculatorBlockItem';

type Props = {
  id: string;
  children: JSX.Element;
};

function DraggableItem({ id, children }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };
  return (
    <CalculatorBlockItem ref={setNodeRef} {...attributes} {...listeners} style={style}>
      {children}
    </CalculatorBlockItem>
  );
}

export default DraggableItem;
