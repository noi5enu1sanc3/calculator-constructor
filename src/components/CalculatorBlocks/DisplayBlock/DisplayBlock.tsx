import { Card } from 'antd';
import React, { useState } from 'react';

function DisplayBlock() {
  const [value, setValue] = useState(0);
  return (
    <Card type="inner">
      <div className="display-content">
        {value}
      </div>
    </Card>
  );
}

export default DisplayBlock;
