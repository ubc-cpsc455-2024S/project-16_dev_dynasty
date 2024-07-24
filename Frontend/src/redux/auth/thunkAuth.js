import { createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from './serviceAuth';


const actionTypes = {
    LOGIN: 'user/login',
    SIGNUP: 'user/signup',
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
