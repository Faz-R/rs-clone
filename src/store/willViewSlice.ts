/* eslint-disable import/extensions */
/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AnyMovieInterface } from '@/types';

export interface IIdWillViewObject {
  value: AnyMovieInterface[];
}

const initialState: IIdWillViewObject = {
  value: [],
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
  },
});

export const { addMovieToWillView, removeMovieFromWillView } = willViewSlice.actions;
export default willViewSlice.reducer;
