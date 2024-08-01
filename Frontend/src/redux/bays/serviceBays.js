import axios from 'axios';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
import { errorHandler } from '../errorHandler';
const getAllBays = async () => {
    try {
        const response = await axios.get(`${BACKEND_URL}/bays`, {
            withCredentials: true 
          });
        return response.data.result;
    } catch (error) {
        console.error('Error fetching bays:', error);
        errorHandler(error, getAllBays.name);
        throw error;
    }
}

const getBay = async (bayid) => {
    try {
        const response = await axios.get(`${BACKEND_URL}/bays/${bayid}`, {
            withCredentials: true 
          });
        return response.data.result;
    } catch (error) {
        console.error(`Error fetching bay with id ${bayid}:`, error);
        errorHandler(error);
        throw error;
    }
}

export default {
    getAllBays,
    getBay
}