import { createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from './serviceAuth';


const actionTypes = {
    LOGIN: 'user/login',
    SIGNUP: 'user/signup',
    VERIFY: 'auth/verifyToken',
    LOGOUT: 'user/logout'
}


export const userLoginAsync = createAsyncThunk(
    actionTypes.LOGIN,
    async (signInData) => {
        return await AuthService.login(signInData);
    });

export const userLogoutAsync = createAsyncThunk(
    actionTypes.LOGOUT,
    async () => {
        return await AuthService.logout();
    }); 



export const verifyTokenAsync = createAsyncThunk(actionTypes.VERIFY, 
    async () => {
        return await AuthService.verifyAuth();
  });
