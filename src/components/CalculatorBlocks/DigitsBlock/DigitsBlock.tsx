import cx from 'classnames';

import { DIGIT_VALUES } from '../../../features/calculator/utils/constants';
import DefaultButton from '../../UI/Buttons/DefaultButton';

import styles from './DigitsBlock.module.css';

type Props = {
  disabled: boolean;
  isOnCanvas: boolean;
}

function DigitsBlock({ disabled, isOnCanvas }: Props) {

  return (
    <div className={cx(styles.container, {[styles.disabled]: disabled, [styles.onCanvas]: isOnCanvas})} >
      <ul className={styles.list}>
        {DIGIT_VALUES.map((value) => (
          <li key={value} className={styles.item}>
            <DefaultButton value={value} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DigitsBlock;
