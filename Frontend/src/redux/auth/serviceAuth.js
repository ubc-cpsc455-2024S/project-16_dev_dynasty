import axios from 'axios';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const login = async (signInData) => {
    try {
        const response = await axios.post(`${BACKEND_URL}/users/signin`, signInData);
        return response.data.result;
    } catch (error) {
        console.error('Error fetching bays:', error);
    }
}



export default {
    login,
}