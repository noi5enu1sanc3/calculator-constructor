import styles from './Header.module.css';

type Props = {
  children: JSX.Element;
};

function Header({ children }: Props) {
  return (
    <header className={styles.header}>
      <div className={styles.container}>{children}</div>
    </header>
  );
}

export default Header;
