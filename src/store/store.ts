import { configureStore } from '@reduxjs/toolkit';

import dndReducer from '../features/dnd/dndSlice';

const store = configureStore({
  reducer: {
    dnd: dndReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
