import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IIdViewed, IIdWillViewObject } from './interfaces';

const initialState: IIdWillViewObject = {
  value: [],
};

export const willViewSlice = createSlice({
  name: 'willview',
  initialState,
  reducers: {
    addIdToWillView: (state, action: PayloadAction<IIdViewed>) => {
      if (!state.value.some((item) => action.payload.id === item.id)) {
        state.value = [...state.value, action.payload];
      }
    },
    removeIdFromWillView: (state, action: PayloadAction<number>) => {
      state.value = state.value.filter((item) => {
        return item.id !== action.payload;
      });
    },
  },
});

export const { addIdToWillView, removeIdFromWillView } = willViewSlice.actions;
export default willViewSlice.reducer;
