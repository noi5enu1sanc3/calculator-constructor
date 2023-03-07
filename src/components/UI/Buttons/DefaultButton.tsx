import { Button } from 'antd';

type ButtonProps = {
  value: string;
};

function DefaultButton({ value }: ButtonProps) {
  return <Button type="default">{value}</Button>;
}

export default DefaultButton;
