/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IIdViewed, IIdViewedObject } from './interfaces';

const initialState: IIdViewedObject = {
  viewed: [],
};

export const viewedSlice = createSlice({
  name: 'viewed',
  initialState,
  reducers: {
    addMovieToViewed: (state, action: PayloadAction<IIdViewed>) => {
      if (!state.viewed.some((item) => action.payload.id === item.id)) {
        state.viewed = [...state.viewed, action.payload];
      }
    },
    removeMovieFromViewed: (state, action: PayloadAction<IIdViewed>) => {
      state.viewed = state.viewed.filter((item) => {
        return item.id !== action.payload.id;
      });
    },
  },
});

export const { addMovieToViewed, removeMovieFromViewed } = viewedSlice.actions;
export default viewedSlice.reducer;
