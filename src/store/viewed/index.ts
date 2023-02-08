import { configureStore } from '@reduxjs/toolkit';

import viewedSliceReducer from './viewedSlice';

export const viewedStore = configureStore({
  reducer: viewedSliceReducer,
});

export type ViewedDispatch = typeof viewedStore.dispatch;
export type ViewedState = ReturnType<typeof viewedStore.getState>;
