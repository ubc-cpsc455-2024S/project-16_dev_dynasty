import { createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from './serviceAuth';


const actionTypes = {
    LOGIN: 'user/login',
    SIGNUP: 'user/signup',
}


export const userLoginAsync = createAsyncThunk(
    actionTypes.LOGIN,
    async (signInData) => {
        return await AuthService.login(signInData);
    })
