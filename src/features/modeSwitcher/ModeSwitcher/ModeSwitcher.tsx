import Toggler from '../../../shared/UI/Toggler/Toggler';
import { useAppDispatch, useAppSelector } from '../../../store/hook';
import { switchMode } from '../modeSlice';
import { Mode } from '../utils/constants';

function ModeSwitcher() {
  const currentMode = useAppSelector(({ modeState }) => modeState.mode);
  const dispatch = useAppDispatch();

  const handleModeSwich = () => dispatch(switchMode());

  const modeOptions: string[] = Object.values(Mode);

  return <Toggler currentMode={currentMode as string} options={modeOptions} onSwitch={handleModeSwich} />;
}

export default ModeSwitcher;
