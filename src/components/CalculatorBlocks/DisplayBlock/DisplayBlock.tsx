import { useState } from 'react';

import styles from './DisplayBlock.module.css';

function DisplayBlock() {
  const [value, setValue] = useState(0);
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <span className={styles.text}>{value}</span>
      </div>
    </div>
  );
}

export default DisplayBlock;
