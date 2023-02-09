import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IIdViewed, IIdViewedObject } from './interfaces';

const initialState: IIdViewedObject = {
  viewed: [],
};

export const viewedSlice = createSlice({
  name: 'viewed',
  initialState,
  reducers: {
    addIdToViewed: (state, action: PayloadAction<IIdViewed>) => {
      if (!state.viewed.some((item) => action.payload.id === item.id)) {
        state.viewed = [...state.viewed, action.payload];
      }
    },
    removeIdFromViewed: (state, action: PayloadAction<number>) => {
      state.viewed = state.viewed.filter((item) => {
        return item.id !== action.payload;
      });
    },
  },
});

export const { addIdToViewed, removeIdFromViewed } = viewedSlice.actions;
export default viewedSlice.reducer;
