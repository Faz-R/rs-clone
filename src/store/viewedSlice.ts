/* eslint-disable import/extensions */
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AnyMovieInterface } from '@/types';

export interface IIdViewedObject {
  viewed: AnyMovieInterface[];
}

const initialState: IIdViewedObject = {
  viewed: [],
};

export const viewedSlice = createSlice({
  name: 'viewed',
  initialState,
  reducers: {
    addMovieToViewed: (state, action: PayloadAction<AnyMovieInterface>) => {
      if (!state.viewed.some((item) => action.payload.id === item.id)) {
        state.viewed = [...state.viewed, action.payload];
      }
    },
    removeMovieFromViewed: (state, action: PayloadAction<AnyMovieInterface>) => {
      state.viewed = state.viewed.filter((item) => {
        return item.id !== action.payload.id;
      });
    },
  },
});

export const { addMovieToViewed, removeMovieFromViewed } = viewedSlice.actions;
export default viewedSlice.reducer;
