import { forwardRef, Ref } from 'react';

type Props = {
  children: JSX.Element;
  style: {
    transform?: string;
    transition?: string;
  };
  onRemove?(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
  id: string,
};

const Item = forwardRef(
  ({ children, style, onRemove, id, ...props }: Props, ref: Ref<HTMLInputElement>) => {
    return (
      <div
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
    );
  }
);

Item.displayName = 'Item';

export default Item;
