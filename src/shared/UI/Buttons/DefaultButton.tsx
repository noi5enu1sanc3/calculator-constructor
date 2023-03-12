import styles from './Button.module.css';

type Props = {
  value: string;
};

function DefaultButton({ value }: Props) {
  return (
    <button className={styles.defaultButton}>
      {value}
    </button>
  );
}

export default DefaultButton;
