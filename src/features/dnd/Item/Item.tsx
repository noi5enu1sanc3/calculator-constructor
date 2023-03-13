import { forwardRef, Ref } from 'react';
import styles from './Item.module.css';
import cx from 'classnames';

type Props = {
  children: JSX.Element;
  style: {
    transform?: string;
    transition?: string;
  };
  onRemove?(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
  id: string,
  isDragging?: boolean
};

const Item = forwardRef(
  ({ children, style, onRemove, id, isDragging, ...props }: Props, ref: Ref<HTMLInputElement>) => {
    return (
      <div className={cx({[styles.ghost]: isDragging, [styles.indicator]: isDragging})}>
        <div className={styles.line}></div>
        <div
        className={isDragging ? styles.item : ''}
          {...props}
          ref={ref}
          style={style}
          id={id}
          onClick={(event) => {
            if (event.detail == 2) {
              onRemove ? onRemove(event) : undefined;
            }
          }}
        >
          {children}
        </div>
      </div>
    );
  }
);

Item.displayName = 'Item';

export default Item;
