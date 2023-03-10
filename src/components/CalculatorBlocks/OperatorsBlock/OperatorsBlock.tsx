import cx from 'classnames';

import DefaultButton from '../../UI/Buttons/DefaultButton';

import styles from './OperatorsBlock.module.css';

type Props = {
  disabled: boolean;
  isOnCanvas: boolean;
}

function OperatorsBlock({ disabled, isOnCanvas }: Props) {
  const values = ['/', 'x', '-', '+'];
  return (
    <div className={cx(styles.container, {[styles.disabled]: disabled, [styles.onCanvas]: isOnCanvas})}>
      <ul className={styles.list}>
        {values.map((value) => (
          <li className={styles.item} key={value}>
            <DefaultButton value={value} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OperatorsBlock;
