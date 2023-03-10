import cx from 'classnames';

import PrimaryButton from '../../UI/Buttons/PrimaryButton';

import styles from './EqualsButtonBlock.module.css';

type Props = {
  disabled: boolean;
  isOnCanvas: boolean;
}

function EqualsButtonBlock({ disabled, isOnCanvas }: Props) {
  return (
    <div className={cx(styles.container, {[styles.disabled]: disabled, [styles.onCanvas]: isOnCanvas})}>
      <PrimaryButton />
    </div>
  );
}

export default EqualsButtonBlock;
