import { createSlice } from '@reduxjs/toolkit';

import { Mode } from './utils/constants';

type ModeState = {
  mode: Mode;
};

const initialState: ModeState = {
  mode: Mode.CONSTRUCTOR,
};

const modeSlice = createSlice({
  name: 'modeState',
  initialState,
  reducers: {
    switchMode: (state) => {
      state.mode = state.mode === Mode.CONSTRUCTOR ? Mode.RUNTIME : Mode.CONSTRUCTOR;
    }
  },
});

export const { switchMode } = modeSlice.actions;
export default modeSlice.reducer;
