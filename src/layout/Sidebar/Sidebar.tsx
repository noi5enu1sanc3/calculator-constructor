import styles from './Sidebar.module.css';

type Props = {
  children?: React.ReactNode
};

function Sidebar({children}: Props) {
  return (
    <div className={styles.container}>
      {children}
    </div>
  );
}

export default Sidebar;
