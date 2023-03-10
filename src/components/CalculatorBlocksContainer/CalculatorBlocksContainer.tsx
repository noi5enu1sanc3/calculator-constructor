import DraggableItem from '../../features/dnd/DraggableItem/DraggableItem';
import { CalculatorBlock } from '../../utils/types';
import CalculatorElement from '../CalculatorBlocks/CalculatorElement/CalculatorElement';

import styles from './CalculatorBlocksContainer.module.css';

type Props = {
  blocks: CalculatorBlock[];
};

function CalculatorBlocksContainer({ blocks }: Props) {

  return (
    <div className={styles.container}>
      {blocks.map((block) =>
        !block.wasDragged ? (
          <DraggableItem key={block.id} id={block.id}>
            <CalculatorElement id={block.id} />
          </DraggableItem>
        ) : (
          <CalculatorElement id={block.id} key={block.id} disabled={block.wasDragged} />
        )
      )}
    </div>
  );
}

export default CalculatorBlocksContainer;
