/* eslint-disable import/extensions */
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AnyMovieInterface } from '@/types';

export interface IIdWillViewObject {
  value: AnyMovieInterface[];
  page: number;
  sort: string | number;
}

const initialState: IIdWillViewObject = {
  value: [],
  page: 0,
  sort: '',
};

export const willViewSlice = createSlice({
  name: 'willview',
  initialState,
  reducers: {
    addMovieToWillView: (state, action: PayloadAction<AnyMovieInterface>) => {
      if (!state.value.some((item) => action.payload.id === item.id)) {
        state.value = [...state.value, action.payload];
      }
    },
    removeMovieFromWillView: (state, action: PayloadAction<AnyMovieInterface>) => {
      state.value = state.value.filter((item) => {
        return item.id !== action.payload.id;
      });
    },
    changePageToWillView: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    changeSortToWillView: (state, action: PayloadAction<string | number>) => {
      state.sort = action.payload;
    },
  },
});

export const {
  addMovieToWillView,
  removeMovieFromWillView,
  changePageToWillView,
  changeSortToWillView,
} = willViewSlice.actions;
export default willViewSlice.reducer;
