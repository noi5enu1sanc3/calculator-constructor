import cx from 'classnames';
import { useState } from 'react';

import styles from './DisplayBlock.module.css';

type Props = {
  disabled: boolean;
  isOnCanvas: boolean
}

function DisplayBlock({ disabled, isOnCanvas }: Props) {

  const [value, setValue] = useState(0);
  return (
    <div className={cx(styles.container, {[styles.disabled]: disabled, [styles.onCanvas]: isOnCanvas})}>
      <div className={styles.content}>
        <span className={styles.text}>{value}</span>
      </div>
    </div>
  );
}

export default DisplayBlock;
