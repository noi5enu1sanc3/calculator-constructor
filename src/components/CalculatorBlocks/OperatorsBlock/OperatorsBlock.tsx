import { Card, Space } from 'antd';
import DefaultButton from '../../UI/Buttons/DefaultButton';

function OperatorsBlock() {
  const values = ['/', 'x', '-', '+'];
  return (
    <Space>
      <Card>
        {
          values.map(value => (
            <DefaultButton
              key={value}
              value={value}
            />
          ))
        }
      </Card>
    </Space>
  );
}

export default OperatorsBlock;
