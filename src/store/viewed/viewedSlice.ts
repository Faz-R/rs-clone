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
  initialState: {
    viewed: initialState,
  },
  reducers: {
    addIdToViewed: (state, action: PayloadAction<IIdViewed>) => {
      if (!state.viewed.find((item) => action.payload.id === item.id)) {
        state.viewed.push(action.payload);
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
