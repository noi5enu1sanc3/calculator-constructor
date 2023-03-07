import styles from './Button.module.css';

type ButtonProps = {
  value: string;
};

function DefaultButton({ value }: ButtonProps) {
  return (
    <button className={styles.defaultButton}>
      {value}
    </button>
  );
}

export default DefaultButton;
