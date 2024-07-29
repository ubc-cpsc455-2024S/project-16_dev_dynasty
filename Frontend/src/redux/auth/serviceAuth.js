import axios from 'axios';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const login = async (signInData) => {
    try {
        const response = await axios.post(`${BACKEND_URL}/users/signin`, signInData,{
            withCredentials: true,
        });
        return response.data.result;
    } catch (error) {
        console.error('Error fetching bays:', error);
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