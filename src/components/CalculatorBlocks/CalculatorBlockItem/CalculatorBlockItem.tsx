import { forwardRef, Ref } from 'react';

type CalculatorBlockItemProps = {
  children: JSX.Element;
  style: {
    transform?: string;
    transition?: string;
  };
  onRemove?(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
  id: string
};

const CalculatorBlockItem = forwardRef(
  ({ children, style, onRemove, id, ...props }: CalculatorBlockItemProps, ref: Ref<HTMLInputElement>) => {
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

CalculatorBlockItem.displayName = 'CalculatorBlockItem';

export default CalculatorBlockItem;
