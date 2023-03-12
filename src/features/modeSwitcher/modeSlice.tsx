import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { BlockId } from '../dnd/utils/constants';

import { Mode } from './utils/constants';

type ModeState = {
  mode: Mode;
  elementIds: BlockId[];
};

const initialState: ModeState = {
  mode: Mode.CONSTRUCTOR,
  elementIds: [],
};

const modeSlice = createSlice({
  name: 'modeState',
  initialState,
  reducers: {
    switchMode: (state) => {
      state.mode = state.mode === Mode.CONSTRUCTOR ? Mode.RUNTIME : Mode.CONSTRUCTOR;
    },
    setElements: (state, action: PayloadAction<BlockId[]>) => {
      state.elementIds = action.payload;
    }
  },
});

export const { switchMode } = modeSlice.actions;
export default modeSlice.reducer;
