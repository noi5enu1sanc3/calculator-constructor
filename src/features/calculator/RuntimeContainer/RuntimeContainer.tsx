import ConstructorElement from '../../../shared/Blocks/ConstructorElement/ConstructorElement';
import { BlockId } from '../../dnd/utils/constants';
import { useCalculator } from '../hooks/useCalculator';

import styles from './RuntimeContainer.module.css';

type Props = {
  blockIds: BlockId[];
};

function RuntimeContainer({ blockIds }: Props) {
  const { displayValue, handleClick } = useCalculator();

  return (
    <div onClick={handleClick} className={styles.container}>
      {blockIds.map((id) => (
        <ConstructorElement key={id} id={id} value={displayValue} isRuntime={true} />
      ))}
    </div>
  );
}

export default RuntimeContainer;
