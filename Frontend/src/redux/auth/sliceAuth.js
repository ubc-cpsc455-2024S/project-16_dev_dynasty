import { createSlice } from '@reduxjs/toolkit'
import { userLoginAsync } from './thunkAuth'

const INITIAL_BAY_STATE = {
  isSignedIn: false,
  user: null,
  status: {
    signIn: 'idle'
  },
  error: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState: INITIAL_BAY_STATE,
  reducers: {},
  extraReducers: builder => {
    builder
      // Handle all bays fetching
      .addCase(userLoginAsync.pending, (state) => {
        state.status.signIn = 'pending';
      })
      .addCase(userLoginAsync.fulfilled, (state, action) => {
        state.status.signIn = 'fulfilled';
        state.isSignedIn = true;
        state.user = action.payload;
      })
      .addCase(userLoginAsync.rejected, (state, action) => {
        state.status.signIn = 'rejected';
        state.error = action.error.message;
      })
  },
})


export default authSlice.reducer
