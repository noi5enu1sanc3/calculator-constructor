import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import cx from 'classnames';

import SortableItem from '../../features/dnd/SortableItem/SortableItem';
import { DROPPABLE_ID, LOCKED_BLOCKS } from '../../features/dnd/utils/constants';
import { BlockId } from '../../features/dnd/utils/constants';
import CalculatorElement from '../CalculatorBlocks/ConstructorElement/ConstructorElement';

import styles from './Canvas.module.css';

type Props = {
  canvasBlocks: BlockId[];
  onRemove?(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
};

function Canvas({ canvasBlocks, onRemove }: Props) {
  const { setNodeRef, over } = useDroppable({
    id: DROPPABLE_ID,
  });

  //const items = canvasBlocks.map((item) => item.id);
  const isTipVisible = !canvasBlocks.length || (canvasBlocks.length <= 1 && over);

  return (
    <SortableContext items={canvasBlocks} strategy={verticalListSortingStrategy}>
      <div
        className={cx(styles.container, {
          [styles.withItems]: canvasBlocks.length > 0,
          [styles.highlight]: over && canvasBlocks.length <= 1,
        })}
        ref={setNodeRef}
      >
        {isTipVisible && (
          <div className={styles.tip}>
            <div className={styles.icon}></div>
            <div className={styles.textBox}>
              <p className={styles.text}>
                <span className={styles.textHighlight}>Перетащите сюда</span>
              </p>
              <p className={styles.text}>любой элемент из&nbsp;левой панели</p>
            </div>
          </div>
        )}

        {canvasBlocks.map((block) => {
          const isItemMovable = !LOCKED_BLOCKS.includes(block);
          return isItemMovable ? (
            <SortableItem key={block} id={block} onRemove={onRemove}>
              <CalculatorElement id={block} isOnCanvas={true} disabled={LOCKED_BLOCKS.includes(block)} />
            </SortableItem>
          ) : (
            <CalculatorElement
              key={block}
              id={block}
              isOnCanvas={true}
              disabled={LOCKED_BLOCKS.includes(block)}
              onRemove={onRemove}
            />
          );
        })}
      </div>
    </SortableContext>
  );
}

export default Canvas;
