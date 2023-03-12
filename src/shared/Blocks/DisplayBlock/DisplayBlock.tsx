import styles from './DisplayBlock.module.css';

type Props = {
  value: string;
}

function DisplayBlock({value}: Props) {
  return (
    <div
      className={styles.container}
    >
      <div className={styles.content}>
        <span className={styles.text}>{value}</span>
      </div>
    </div>
  );
}

export default DisplayBlock;
