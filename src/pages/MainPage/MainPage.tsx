import Header from '../../layout/Header/Header';
import Main from '../../layout/Main/Main';

import styles from './MainPage.module.css';

function MainPage() {
  return (
    <div className={styles.page}>
      <Header />
      <Main />
    </div>
  );
}

export default MainPage;
