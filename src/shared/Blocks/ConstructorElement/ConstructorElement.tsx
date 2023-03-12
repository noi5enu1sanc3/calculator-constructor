import cx from 'classnames';

import { INITIAL_VALUE } from '../../../features/calculator/utils/constants';
import { BlockId } from '../../../features/dnd/utils/constants';
import DigitsBlock from '../DigitsBlock/DigitsBlock';
import DisplayBlock from '../DisplayBlock/DisplayBlock';
import EqualsButtonBlock from '../EqualsButtonBlock/EqualsButtonBlock';
import OperatorsBlock from '../OperatorsBlock/OperatorsBlock';

import styles from './ConstructorElement.module.css';

type Props = {
  id: BlockId;
  disabled?: boolean;
  isOnCanvas?: boolean;
  onRemove?(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
  value?: string;
  isRuntime?: boolean;
  isDragging?: boolean;
  isError?: boolean;
};

function ConstructorElement({ id, disabled, isOnCanvas, onRemove, value = INITIAL_VALUE, isRuntime, isDragging, isError }: Props) {
  const renderBlock = (id: BlockId) => {
    switch (id) {
    case BlockId.DISPLAY:
      return <DisplayBlock value={value} isError={isError} />;
    case BlockId.OPERATORS:
      return <OperatorsBlock />;
    case BlockId.DIGITS:
      return <DigitsBlock />;
    case BlockId.EQUALS:
      return <EqualsButtonBlock />;
    }
  };
  return (
    <div
      className={cx(styles.container, {
        [styles.disabled]: disabled,
        [styles.onCanvas]: isOnCanvas,
        [styles.runtime]: isRuntime,
        [styles.locked]: disabled && isOnCanvas,
        [styles.dragging]: isDragging
      })}
      key={id}
      onDoubleClick={onRemove ? (event) => onRemove(event) : undefined}
      id={id}
    >
      {renderBlock(id)}
    </div>
  );
}

export default ConstructorElement;
