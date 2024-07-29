import { createSlice } from '@reduxjs/toolkit'
import { userLoginAsync, verifyTokenAsync, userLogoutAsync } from './thunkAuth'

const INITIAL_AUTH_STATE = {
  isSignedIn: false,
  user: null,
  status: {
    signIn: 'idle',
    verifyAuth: 'idle',
    logOut: 'idle'
  },
  error: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState: INITIAL_AUTH_STATE,
  reducers: {
    // setUserFromToken(state, action) {
    //   state.isSignedIn = true;
    //   state.user = action.payload;
    // }
  },
  extraReducers: builder => {
    builder
      // handle login
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
      // handle verify jtw
      .addCase(verifyTokenAsync.pending, (state) => {
        state.status.verifyAuth = 'pending';
      })
      .addCase(verifyTokenAsync.fulfilled, (state, action) => {
        state.status.verifyAuth = 'fulfilled';
        state.isSignedIn = true;
        state.user = action.payload;
      })
      .addCase(verifyTokenAsync.rejected, (state, action) => {
        state.status.verifyAuth = 'rejected';
        state.error = action.error.message;
      })
      // handle logout
      .addCase(userLogoutAsync.pending, (state) => {
        state.status.logOut = 'pending';
      })
      .addCase(userLogoutAsync.fulfilled, (state) => {
        state.status.logOut = 'fulfilled';
        state.isSignedIn = false;
        state.user = null;
      })
      .addCase(userLogoutAsync.rejected, (state, action) => {
        state.status.logOut = 'rejected';
        state.error = action.error.message;
      })
  },
})

// export const { setUserFromToken } = authSlice.actions;
export default authSlice.reducer
