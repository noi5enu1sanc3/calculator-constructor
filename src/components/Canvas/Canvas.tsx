import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

import DraggableItem from '../../features/dnd/DraggableItem/DraggableItem';
import { BlockId } from '../../utils/constants';
import { CalculatorBlock } from '../../utils/types';
import DigitsBlock from '../CalculatorBlocks/DigitsBlock/DigitsBlock';
import DisplayBlock from '../CalculatorBlocks/DisplayBlock/DisplayBlock';
import EqualsButtonBlock from '../CalculatorBlocks/EqualsButtonBlock/EqualsButtonBlock';
import OperatorsBlock from '../CalculatorBlocks/OperatorsBlock/OperatorsBlock';

import styles from './Canvas.module.css';

type Props = {
  canvasBlocks: CalculatorBlock[];
  onRemove?(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
};

function Canvas({ canvasBlocks, onRemove }: Props) {
  const {setNodeRef} = useDroppable({
    id: 'canvas'
  });
  const renderBlock = (id: BlockId) => {
    switch (id) {
    case BlockId.Display:
      return <DisplayBlock />;
    case BlockId.Operators:
      return <OperatorsBlock />;
    case BlockId.Digits:
      return <DigitsBlock />;
    case BlockId.Equals:
      return <EqualsButtonBlock />;
    }
  };
  return (
    <SortableContext items={canvasBlocks} strategy={verticalListSortingStrategy}>
      <div className={styles.container} ref={setNodeRef}>
        {!canvasBlocks.length ? (
          <div className={styles.tip}>
            <div className={styles.icon}></div>
            <div className={styles.textBox}>
              <p className={styles.text}>
                <span className={styles.textHighlight}>Перетащите сюда</span>
              </p>
              <p className={styles.text}>любой элемент из&nbsp;левой панели</p>
            </div>
          </div>
        ) : (
          canvasBlocks.map((block) => (
            <DraggableItem key={block.id} id={block.id} onRemove={onRemove}>
              {renderBlock(block.id)}
            </DraggableItem>
          ))
        )}
      </div>
    </SortableContext>
  );
}

export default Canvas;
