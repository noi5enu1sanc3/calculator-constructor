import { forwardRef, Ref } from 'react';

type CalculatorBlockItemProps = {
  children: JSX.Element;
  style: {
    transform?: string;
    transition?: string
  }
};

const CalculatorBlockItem = forwardRef(
  ({ children, style, ...props }: CalculatorBlockItemProps, ref: Ref<HTMLInputElement>) => {
    return (
      <div {...props} ref={ref} style={style}>
        {children}
      </div>
    );
  }
);

CalculatorBlockItem.displayName = 'CalculatorBlockItem';

export default CalculatorBlockItem;
