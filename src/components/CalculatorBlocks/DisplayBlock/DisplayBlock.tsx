import cx from 'classnames';
import { useState } from 'react';

import { BlockId } from '../../../utils/constants';

import styles from './DisplayBlock.module.css';

type Props = {
  disabled: boolean;
  isOnCanvas: boolean;
  onRemove?(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
  id: BlockId;
};

function DisplayBlock({ disabled, isOnCanvas, onRemove, id }: Props) {
  const [value, setValue] = useState(0);
  return (
    <div
      className={cx(styles.container, {
        [styles.disabled]: disabled,
        [styles.onCanvas]: isOnCanvas,
        [styles.locked]: disabled && isOnCanvas,
      })}
      onDoubleClick={onRemove ? (event) => onRemove(event) : undefined}
      id={id}
    >
      <div className={styles.content}>
        <span className={styles.text}>{value}</span>
      </div>
    </div>
  );
}

export default DisplayBlock;
