import ConstructorElement from '../../../shared/Blocks/ConstructorElement/ConstructorElement';
import DraggableItem from '../DraggableItem/DraggableItem';
import { CalculatorBlock } from '../utils/types';

import styles from './DraggablesContainer.module.css';

type Props = {
  blocks: CalculatorBlock[];
};

function DraggablesContainer({ blocks }: Props) {
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

export default DraggablesContainer;
