import Icon, { EyeOutlined } from '@ant-design/icons';
import { Segmented, Space } from 'antd';
import { useState } from 'react';

import CodeSvg from '../UI/SVGIcons/CodeSvg';

function ModeSwitcher() {
  const [mode, setMode] = useState<string | number>('Constructor');

  const CodeIcon = () => <Icon component={CodeSvg} />;

  const modeOptions = [
    { label: 'Constructor', value: 'Constructor', icon: <EyeOutlined /> },
    { label: 'Runtime', value: 'Runtime', icon: <CodeIcon /> },
  ];
  return (
    <Segmented options={modeOptions} value={mode} onChange={setMode} />
  );
}

export default ModeSwitcher;
