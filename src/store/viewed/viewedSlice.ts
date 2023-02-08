import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IIdViewed {
  idViewed: string[];
}

const initialState: IIdViewed = { idViewed: [] };

export const viewedSlice = createSlice({
  name: 'viewed',
  initialState,
  reducers: {
    addIdToViewed: (state, action: PayloadAction<string>) => {
      state.idViewed.push(action.payload);
    },
  },
});

export const { addIdToViewed } = viewedSlice.actions;
export default viewedSlice.reducer;
