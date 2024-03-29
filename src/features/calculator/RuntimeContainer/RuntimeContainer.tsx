import cx from 'classnames';

import ConstructorElement from '../../../shared/Blocks/ConstructorElement/ConstructorElement';
import { BlockId } from '../../dnd/utils/constants';
import { useCalculator } from '../hooks/useCalculator';

import styles from './RuntimeContainer.module.css';

type Props = {
  blockIds: BlockId[];
};

function RuntimeContainer({ blockIds }: Props) {
  const { displayValue, handleClick, isError } = useCalculator();

  return (
    <div onClick={handleClick} className={cx(styles.container, { [styles.empty]: blockIds.length === 0 })}>
      {blockIds.map((id) => (
        <ConstructorElement key={id} id={id} value={displayValue} isRuntime={true} isError={isError} />
      ))}
    </div>
  );
}

export default RuntimeContainer;
