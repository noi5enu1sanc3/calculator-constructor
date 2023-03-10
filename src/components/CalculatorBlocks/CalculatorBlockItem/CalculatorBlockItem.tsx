import { forwardRef, Ref } from 'react';

type CalculatorBlockItemProps = {
  children: JSX.Element;
  style: {
    transform?: string;
    transition?: string;
  };
  onRemove?(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
};

const CalculatorBlockItem = forwardRef(
  ({ children, style, onRemove, ...props }: CalculatorBlockItemProps, ref: Ref<HTMLInputElement>) => {
    return (
      <div
        {...props}
        ref={ref}
        style={style}
        onClick={(event) => {
          if (event.detail == 2) {
            // console.log('Double Clicked');
            onRemove ? onRemove(event) : undefined
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
