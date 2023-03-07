import ModeSwitcher from '../../components/ModeSwitcher/ModeSwitcher';

import styles from './Header.module.css';

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <ModeSwitcher />
      </div>
    </header>
  );
}

export default Header;
