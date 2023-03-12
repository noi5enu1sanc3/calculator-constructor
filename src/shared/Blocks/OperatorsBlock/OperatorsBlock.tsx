import { OPERATORS } from '../../../features/calculator/utils/constants';
import DefaultButton from '../../UI/Buttons/DefaultButton';

import styles from './OperatorsBlock.module.css';

function OperatorsBlock() {
  return (
    <div className={styles.container}>
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
