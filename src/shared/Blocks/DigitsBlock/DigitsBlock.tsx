import { DIGIT_VALUES } from '../../../features/calculator/utils/constants';
import DefaultButton from '../../UI/Buttons/DefaultButton';

import styles from './DigitsBlock.module.css';

function DigitsBlock() {
  return (
    <div className={styles.container}>
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
