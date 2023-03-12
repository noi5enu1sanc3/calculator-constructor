import Icon, { EyeOutlined } from '@ant-design/icons';
import { Segmented } from 'antd';

import CodeSvg from '../SVGIcons/CodeSvg';

import styles from './Toggler.module.css';


type Props = {
  options: string[];
  currentMode: string;
  onSwitch: () => void;
};

function Toggler({ options, currentMode, onSwitch }: Props) {
  const CodeIcon = () => <Icon component={CodeSvg} />;

  const icons: { [key: string]: JSX.Element } = {
    Constructor: <CodeIcon />,
    Runtime: <EyeOutlined />,
  };

  const modeOptions = options.map((option) => {
    return { label: option, value: option, icon: icons[option] };
  });

  return (
    <div className={styles.container}>
      <Segmented options={modeOptions} value={currentMode} onChange={onSwitch} size="large" />
    </div>
  );
}

export default Toggler;
