import { Card } from 'antd';

import DigitsBlock from '../CalculatorBlocks/DigitsBlock/DigitsBlock';
import DisplayBlock from '../CalculatorBlocks/DisplayBlock/DisplayBlock';
import EqualsButtonBlock from '../CalculatorBlocks/EqualsButtonBlock/EqualsButtonBlock';
import OperatorsBlock from '../CalculatorBlocks/OperatorsBlock/OperatorsBlock';

function CalculatorBlocksContainer() {
  return <Card>
    <DisplayBlock />
    <OperatorsBlock />
    <DigitsBlock />
    <EqualsButtonBlock />
  </Card>;
}

export default CalculatorBlocksContainer;
