import DraggableItem from '../../features/dnd/DraggableItem/DraggableItem';
import { CalculatorBlock } from '../../features/dnd/utils/types';
import ConstructorElement from '../CalculatorBlocks/ConstructorElement/ConstructorElement';

import styles from './ConstructorBlocksContainer.module.css';

type Props = {
  blocks: CalculatorBlock[];
};

function ConstructorBlocksContainer({ blocks }: Props) {

  return (
    <div className={styles.container}>
      {blocks.map((block) =>
        !block.wasDragged ? (
          <DraggableItem key={block.id} id={block.id}>
            <ConstructorElement id={block.id} />
          </DraggableItem>
        ) : (
          <ConstructorElement id={block.id} key={block.id} disabled={block.wasDragged} />
        )
      )}
    </div>
  );
}

export default ConstructorBlocksContainer;
