import ConstructorElement from '../../../components/CalculatorBlocks/ConstructorElement/ConstructorElement';
import { BlockId } from '../../dnd/utils/constants';
import { useCalculator } from '../hooks/useCalculator';

type Props = {
  blockIds: BlockId[];
};

function RuntimeContainer({ blockIds }: Props) {
  const { displayValue, handleClick } = useCalculator();

  return (
    <div onClick={handleClick}>
      {blockIds.map((id) => (
        <ConstructorElement key={id} id={id} value={displayValue} />
      ))}
    </div>
  );
}

export default RuntimeContainer;
