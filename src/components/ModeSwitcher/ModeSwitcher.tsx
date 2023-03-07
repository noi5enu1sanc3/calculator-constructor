import { Segmented, Space } from 'antd';
import { useState } from 'react';

function ModeSwitcher() {
  const [mode, setMode] = useState<string | number>('constructor');

  const modeOptions = ['constructor', 'runtime'];
  return <Segmented options={modeOptions} value={mode} onChange={setMode}>ModeSwitcher</Segmented>;
}

export default ModeSwitcher;
