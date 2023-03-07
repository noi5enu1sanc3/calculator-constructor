import CalculatorBlocksContainer from '../CalculatorBlocksContainer/CalculatorBlocksContainer';

import styles from './Sidebar.module.css';

function Sidebar() {
  return (
    <div className={styles.container}>
      <CalculatorBlocksContainer />
    </div>
  );
}

export default Sidebar;
