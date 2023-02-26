/* eslint-disable import/no-cycle */
/* eslint-disable import/extensions */
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AnyMovieInterface } from '@/types';
import { RootState } from './index';

export interface IIdViewedObject {
  viewed: AnyMovieInterface[];
  page: number;
  sort: string | number;
}

const initialState: IIdViewedObject = {
  viewed: [],
  page: 0,
  sort: '',
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
    changePageToViewed: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    changeSortToViewed: (state, action: PayloadAction<string | number>) => {
      state.sort = action.payload;
    },
  },
});

export const { addMovieToViewed, removeMovieFromViewed, changePageToViewed, changeSortToViewed } =
  viewedSlice.actions;
export const selectViewed = (state: RootState) => state.viewed.viewed;
export default viewedSlice.reducer;
