import Canvas from '../../components/Canvas/Canvas';
import Sidebar from '../../components/Sidebar/Sidebar';

import styles from './Main.module.css';

function Main() {
  return (
    <main className={styles.main}>
      <Sidebar />
      <Canvas />
    </main>
  );
}

export default Main;
