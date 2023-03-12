import cx from 'classnames';

import styles from './DisplayBlock.module.css';

type Props = {
  value: string;
  isError?: boolean;
};

function DisplayBlock({ value, isError }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <span className={cx(styles.text, {[styles.error]: isError})}>{value}</span>
      </div>
    </div>
  );
}

export default DisplayBlock;
