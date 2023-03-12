import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { BlockId } from './utils/constants';
import { CalculatorBlock } from './utils/types';

type DndState = {
  elements: CalculatorBlock[];
};

const initialState: DndState = {
  elements: [
    
  ],
};

const dndSlice = createSlice({
  name: 'dnd',
  initialState,
  reducers: {
    setWasDragged: (state, action: PayloadAction<string>) => {
      const target = state.elements.find((el) => el.id === action.payload);
      if (target) target.wasDragged = true;
    },
  },
});

export const {setWasDragged} = dndSlice.actions;
export default dndSlice.reducer;
