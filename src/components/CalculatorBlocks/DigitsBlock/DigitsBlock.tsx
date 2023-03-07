import { Card, Space } from 'antd';

import DefaultButton from '../../UI/Buttons/DefaultButton';

function DigitsBlock() {
  const values = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', ','];
  return (
    <Space>
      <Card type="inner">
        {values.map((value) => (
          <DefaultButton key={value} value={value} />
        ))}
      </Card>
    </Space>
  );
}

export default DigitsBlock;
