// import CalculatorBlocksContainer from '../CalculatorBlocksContainer/CalculatorBlocksContainer';

import styles from './Sidebar.module.css';

type Props = {
  children?: React.ReactNode
};

function Sidebar({children}: Props) {
  return (
    <div className={styles.container}>
      {/* <CalculatorBlocksContainer /> */}
      {children}
    </div>
  );
}

export default Sidebar;
