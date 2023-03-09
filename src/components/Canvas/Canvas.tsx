import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

import DraggableItem from '../../features/dnd/DraggableItem/DraggableItem';
import { CalculatorBlock } from '../../utils/types';

import styles from './Canvas.module.css';

type Props = {
  canvasBlocks: CalculatorBlock[];
};

function Canvas({ canvasBlocks }: Props) {
  const {setNodeRef} = useDroppable({
    id: 'canvas'
  });
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
            <DraggableItem key={block.id} id={block.id}>
              {block.element}
            </DraggableItem>
          ))
        )}
      </div>
    </SortableContext>
  );
}

export default Canvas;
