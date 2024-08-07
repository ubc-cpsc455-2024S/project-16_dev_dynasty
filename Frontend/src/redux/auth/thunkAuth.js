import { createAsyncThunk } from '@reduxjs/toolkit'
import AuthService from './serviceAuth'

const actionTypes = {
  LOGIN: 'user/login',
  SIGNUP: 'user/signup',
  VERIFY: 'auth/verifyToken',
  GETALL: 'user/all',
  DELETE: 'user/delete',
  LOGOUT: 'user/logout',
}

export const userLoginAsync = createAsyncThunk(
  actionTypes.LOGIN,
  async signInData => {
    return await AuthService.login(signInData)
  }
)

export const userSignupAsync = createAsyncThunk(
  actionTypes.SIGNUP,
  async userData => {
    return await AuthService.addUser(userData)
  }
)

export const userLogoutAsync = createAsyncThunk(
  actionTypes.LOGOUT,
  async () => {
    return await AuthService.logout()
  }
)

export const verifyTokenAsync = createAsyncThunk(
  actionTypes.VERIFY,
  async () => {
    return await AuthService.verifyAuth()
  }
)

export const getUsersAsync = createAsyncThunk(actionTypes.GETALL, async () => {
  return await AuthService.getUsers()
})

export const deleteUserAsync = createAsyncThunk(
  actionTypes.DELETE,
  async userId => {
    return await AuthService.deleteUser(userId)
  }
)
