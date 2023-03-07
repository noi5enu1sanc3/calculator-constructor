import Icon, { EyeOutlined } from '@ant-design/icons';
import { Segmented } from 'antd';
import { useState } from 'react';

import CodeSvg from '../UI/SVGIcons/CodeSvg';

import styles from './ModeSwitcher.module.css';

function ModeSwitcher() {
  const [mode, setMode] = useState<string | number>('Constructor');

  const CodeIcon = () => <Icon component={CodeSvg} />;

  const modeOptions = [
    { label: 'Runtime', value: 'Runtime', icon: <EyeOutlined /> },
    { label: 'Constructor', value: 'Constructor', icon: <CodeIcon /> },
  ];

  return (
    <div className={styles.container}>
      <Segmented options={modeOptions} value={mode} onChange={setMode} size="large" />
    </div>
  );
}

export default ModeSwitcher;
