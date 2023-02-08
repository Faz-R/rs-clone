import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IIdViewed {
  id: number;
  name: string;
  countries: string[] | null;
  genres: string[];
  description: string;
  poster: string | null;
  rating: number;
  year: number;
}

const initialState: IIdViewed[] = [];

export const viewedSlice = createSlice({
  name: 'viewed',
  initialState,
  reducers: {
    addIdToViewed: (state, action: PayloadAction<IIdViewed>) => {
      if (!state.find((item) => action.payload.id === item.id)) {
        state.push(action.payload);
      }
    },
    removeIdFromViewed: (state, action: PayloadAction<number>) => {
      state = state.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addIdToViewed, removeIdFromViewed } = viewedSlice.actions;
export default viewedSlice.reducer;
