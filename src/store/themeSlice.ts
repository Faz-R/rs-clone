import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  value: '',
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    addTheme: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { addTheme } = themeSlice.actions;
export default themeSlice.reducer;
