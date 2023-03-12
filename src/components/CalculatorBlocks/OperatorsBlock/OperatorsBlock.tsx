import cx from 'classnames';

import { OPERATORS } from '../../../features/calculator/utils/constants';
import DefaultButton from '../../UI/Buttons/DefaultButton';

import styles from './OperatorsBlock.module.css';

type Props = {
  disabled: boolean;
  isOnCanvas: boolean;
}

function OperatorsBlock({ disabled, isOnCanvas }: Props) {
  return (
    <div className={cx(styles.container, {[styles.disabled]: disabled, [styles.onCanvas]: isOnCanvas})}>
      <ul className={styles.list}>
        {OPERATORS.map((value) => (
          <li className={styles.item} key={value}>
            <DefaultButton value={value} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OperatorsBlock;
