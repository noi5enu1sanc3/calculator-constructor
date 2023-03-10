import { BlockId } from '../../../utils/constants';
import DigitsBlock from '../DigitsBlock/DigitsBlock';
import DisplayBlock from '../DisplayBlock/DisplayBlock';
import EqualsButtonBlock from '../EqualsButtonBlock/EqualsButtonBlock';
import OperatorsBlock from '../OperatorsBlock/OperatorsBlock';

type Props = {
  id: BlockId;
  disabled?: boolean;
  isOnCanvas?: boolean
};

function CalculatorElement({ id, disabled = false, isOnCanvas = false }: Props) {
  switch (id) {
    case BlockId.Display:
      return <DisplayBlock key={id} disabled={disabled} isOnCanvas={isOnCanvas} />;
    case BlockId.Operators:
      return <OperatorsBlock key={id} disabled={disabled} isOnCanvas={isOnCanvas} />;
    case BlockId.Digits:
      return <DigitsBlock key={id} disabled={disabled} isOnCanvas={isOnCanvas} />;
    case BlockId.Equals:
      return <EqualsButtonBlock key={id} disabled={disabled} isOnCanvas={isOnCanvas} />;
  }
}

export default CalculatorElement;
