import styles from './Content.module.css';

type Props = {
  children?: React.ReactNode;
};

function Content({ children }: Props) {
  return <div className={styles.container}>{children}</div>;
}

export default Content;
