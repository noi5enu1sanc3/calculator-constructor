import { configureStore } from '@reduxjs/toolkit';

import modeReducer from '../features/modeSwitcher/modeSlice';

const store = configureStore({
  reducer: {
    modeState: modeReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
