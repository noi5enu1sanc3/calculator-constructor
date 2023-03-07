import DigitsBlock from '../CalculatorBlocks/DigitsBlock/DigitsBlock';
import DisplayBlock from '../CalculatorBlocks/DisplayBlock/DisplayBlock';
import EqualsButtonBlock from '../CalculatorBlocks/EqualsButtonBlock/EqualsButtonBlock';
import OperatorsBlock from '../CalculatorBlocks/OperatorsBlock/OperatorsBlock';

import styles from './CalculatorBlocksContainer.module.css';

function CalculatorBlocksContainer() {
  return (
    <div className={styles.container}>
      <DisplayBlock />
      <OperatorsBlock />
      <DigitsBlock />
      <EqualsButtonBlock />
    </div>
  );
}

export default CalculatorBlocksContainer;
