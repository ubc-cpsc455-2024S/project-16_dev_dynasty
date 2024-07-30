import axios from 'axios';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import { toast } from 'react-toastify'

const login = async (signInData) => {
    try {
        const response = await axios.post(`${BACKEND_URL}/users/signin`, signInData,{
            withCredentials: true,
        });
        return response.data.result;
    } catch (error) {
        console.error('Error loging in:', error);
        if(error.response.status === 401) {
            toast.error('Incorrect password');
        }
        if(error.response.status === 404) {
            toast.error('Incorrect username');
        }
        throw error;
    }
}

const verifyAuth = async () => {
    try {
        const response  = await axios.get(`${BACKEND_URL}/users/verify-token`, {
            withCredentials: true,
        });
        return response.data.user;
    } catch (error) {
        console.error('error verifying user auth: ', error);
        throw error;
    }
}

const logout = async () => {
    try {
        const response = await axios.get(`${BACKEND_URL}/users/logout`,{
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching bays:', error);
        throw error;
    }
}



export default {
    login,
    verifyAuth,
    logout
}