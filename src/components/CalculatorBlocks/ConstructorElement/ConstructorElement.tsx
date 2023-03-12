import { BlockId } from '../../../features/dnd/utils/constants';
import DigitsBlock from '../DigitsBlock/DigitsBlock';
import DisplayBlock from '../DisplayBlock/DisplayBlock';
import EqualsButtonBlock from '../EqualsButtonBlock/EqualsButtonBlock';
import OperatorsBlock from '../OperatorsBlock/OperatorsBlock';

type Props = {
  id: BlockId;
  disabled?: boolean;
  isOnCanvas?: boolean;
  onRemove?(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
  value?: string
};

function ConstructorElement({ id, disabled = false, isOnCanvas = false, onRemove, value='0' }: Props) {
  switch (id) {
  case BlockId.DISPLAY:
    return <DisplayBlock key={id} disabled={disabled} isOnCanvas={isOnCanvas} onRemove={onRemove} id={id} value={value} />;
  case BlockId.OPERATORS:
    return <OperatorsBlock key={id} disabled={disabled} isOnCanvas={isOnCanvas} />;
  case BlockId.DIGITS:
    return <DigitsBlock key={id} disabled={disabled} isOnCanvas={isOnCanvas} />;
  case BlockId.EQUALS:
    return <EqualsButtonBlock key={id} disabled={disabled} isOnCanvas={isOnCanvas} />;
  }


}

export default ConstructorElement;
