import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import cx from 'classnames';

import SortableItem from '../../features/dnd/SortableItem/SortableItem';
import { BlockId, DROPPABLE_ID, LOCKED_BLOCKS } from '../../utils/constants';
import { CalculatorBlock } from '../../utils/types';
import CalculatorElement from '../CalculatorBlocks/CalculatorElement/CalculatorElement';

import styles from './Canvas.module.css';

type Props = {
  canvasBlocks: CalculatorBlock[];
  onRemove?(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
};

function Canvas({ canvasBlocks, onRemove }: Props) {
  const { setNodeRef } = useDroppable({
    id: DROPPABLE_ID,
  });

  const items = canvasBlocks.map((item) => item.id);

  return (
    <SortableContext items={items} strategy={verticalListSortingStrategy}>
      <div className={cx(styles.container, { [styles.withItems]: canvasBlocks.length > 0 })} ref={setNodeRef}>
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
          canvasBlocks.map((block) =>
            !LOCKED_BLOCKS.includes(block.id) ? (
              <SortableItem key={block.id} id={block.id} onRemove={onRemove}>
                <CalculatorElement id={block.id} isOnCanvas={true} disabled={LOCKED_BLOCKS.includes(block.id)} />
              </SortableItem>
            ) : (
              <CalculatorElement
                key={block.id}
                id={block.id}
                isOnCanvas={true}
                disabled={LOCKED_BLOCKS.includes(block.id)}
                onRemove={onRemove}
              />
            )
          )
        )}
      </div>
    </SortableContext>
  );
}

export default Canvas;
