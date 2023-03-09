import DraggableItem from '../../features/dnd/DraggableItem/DraggableItem';
import { BlockId } from '../../utils/constants';
import { CalculatorBlock } from '../../utils/types';
import DigitsBlock from '../CalculatorBlocks/DigitsBlock/DigitsBlock';
import DisplayBlock from '../CalculatorBlocks/DisplayBlock/DisplayBlock';
import EqualsButtonBlock from '../CalculatorBlocks/EqualsButtonBlock/EqualsButtonBlock';
import OperatorsBlock from '../CalculatorBlocks/OperatorsBlock/OperatorsBlock';

import styles from './CalculatorBlocksContainer.module.css';

type Props = {
  blocks: CalculatorBlock[]
}

function CalculatorBlocksContainer({blocks}: Props) {

  return (
    <div className={styles.container}>
      {blocks.map(block => (
        <DraggableItem key={block.id} id={block.id}>
          {block.element}
        </DraggableItem>
      ))}
    </div>
  );
}

export default CalculatorBlocksContainer;
