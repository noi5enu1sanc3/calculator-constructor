import DefaultButton from '../../UI/Buttons/DefaultButton';

import styles from './DigitsBlock.module.css';

function DigitsBlock() {
  const values = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', ','];

  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {values.map((value) => (
          <li key={value} className={styles.item}>
            <DefaultButton value={value} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DigitsBlock;
