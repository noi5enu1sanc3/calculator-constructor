import styles from './Canvas.module.css';

function Canvas() {
  return (
    <div className={styles.container}>
      <div className={styles.tip}>
        <div className={styles.icon}></div>
        <div className={styles.textBox}>
          <p className={styles.text}>
            <span className={styles.textHighlight}>Перетащите сюда</span>
          </p>
          <p className={styles.text}>любой элемент из&nbsp;левой панели</p>
        </div>
      </div>
    </div>
  );
}

export default Canvas;
