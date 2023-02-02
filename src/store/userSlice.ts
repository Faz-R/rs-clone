import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from './index';
import fetchUserData from './userAPI';
import type { UserDataInterface, UserStateInterface } from '../type';

const initialState: UserStateInterface = {
  data: { username: 'Eugene', age: 35, gender: 'male' },
  status: 'idle',
};

export const getUserData = createAsyncThunk('user/fetchUserData', async (id: number) => {
  const response = await fetchUserData(id);
  return response;
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeUserName: (state, action: PayloadAction<string>) => {
      state.data.username = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getUserData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.status = 'idle';
        state.data = action.payload;
      })
      .addCase(getUserData.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { changeUserName } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd =
//   (amount: number): AppThunk =>
//   (dispatch, getState) => {
//     const currentValue = selectCount(getState());
//     if (currentValue % 2 === 1) {
//       dispatch(incrementByAmount(amount));
//     }
//   };

export default userSlice.reducer;
