import DraggableItem from '../../features/dnd/DraggableItem/DraggableItem';
import { BlockId } from '../../utils/constants';
import { CalculatorBlock } from '../../utils/types';
import DigitsBlock from '../CalculatorBlocks/DigitsBlock/DigitsBlock';
import DisplayBlock from '../CalculatorBlocks/DisplayBlock/DisplayBlock';
import EqualsButtonBlock from '../CalculatorBlocks/EqualsButtonBlock/EqualsButtonBlock';
import OperatorsBlock from '../CalculatorBlocks/OperatorsBlock/OperatorsBlock';

import styles from './CalculatorBlocksContainer.module.css';

type Props = {
  blocks: CalculatorBlock[];
};

function CalculatorBlocksContainer({ blocks }: Props) {
  const renderBlock = (id: BlockId) => {
    switch (id) {
    case BlockId.Display:
      return <DisplayBlock key={id} />;
    case BlockId.Operators:
      return <OperatorsBlock key={id} />;
    case BlockId.Digits:
      return <DigitsBlock key={id} />;
    case BlockId.Equals:
      return <EqualsButtonBlock key={id} />;
    }
  };

  return (
    <div className={styles.container}>
      {blocks.map((block) =>
        !block.wasDragged ? (
          <DraggableItem key={block.id} id={block.id}>
            {renderBlock(block.id)}
          </DraggableItem>
        ) : (
          renderBlock(block.id)
        )
      )}
    </div>
  );
}

export default CalculatorBlocksContainer;
