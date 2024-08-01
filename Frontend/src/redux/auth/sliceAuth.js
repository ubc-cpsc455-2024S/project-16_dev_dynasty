import { createSlice } from '@reduxjs/toolkit'
import { userLoginAsync, verifyTokenAsync, userLogoutAsync, getUsersAsync, deleteUserAsync, userSignupAsync } from './thunkAuth'

const INITIAL_AUTH_STATE = {
  isSignedIn: false,
  user: null,
  allUsers: [],
  status: {
    signIn: 'idle',
    verifyAuth: 'idle',
    getAllUsers: 'idle',
    deleteUser: 'idle',
    addUser: 'idle',
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
        state.error = null;
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
        state.error = null;
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
        state.error = null;
      })
      .addCase(userLogoutAsync.rejected, (state, action) => {
        state.status.logOut = 'rejected';
        state.error = action.error.message;
      })
      // handle getAll
      .addCase(getUsersAsync.pending, (state) => {
        state.status.getAllUsers = 'pending';
      })
      .addCase(getUsersAsync.fulfilled, (state, action) => {
        state.status.getAllUsers = 'fulfilled';
        state.allUsers = action.payload;
        state.error = null;
      })
      .addCase(getUsersAsync.rejected, (state, action) => {
        state.status.getAllUsers = 'rejected';
        state.error = action.error.message;
      })
      // handle delete
      .addCase(deleteUserAsync.pending, (state) => {
        state.status.deleteUser = 'pending';
      })
      .addCase(deleteUserAsync.fulfilled, (state) => {
        state.status.deleteUser = 'fulfilled';
        state.error = null;
      })
      .addCase(deleteUserAsync.rejected, (state, action) => {
        state.status.deleteUser = 'rejected';
        state.error = action.error.message;
      })
      // handle add
      .addCase(userSignupAsync.pending, (state) => {
        state.status.addUser = 'pending';
      })
      .addCase(userSignupAsync.fulfilled, (state) => {
        state.status.addUser = 'fulfilled';
        state.error = null;
      })
      .addCase(userSignupAsync.rejected, (state, action) => {
        state.status.addUser = 'rejected';
        state.error = action.error.message;
      })
  },
})

// export const { setUserFromToken } = authSlice.actions;
export default authSlice.reducer
