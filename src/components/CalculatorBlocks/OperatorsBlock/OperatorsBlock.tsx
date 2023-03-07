import DefaultButton from '../../UI/Buttons/DefaultButton';

import styles from './OperatorsBlock.module.css';

function OperatorsBlock() {
  const values = ['/', 'x', '-', '+'];
  return (
    <div className={styles.container}>
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
