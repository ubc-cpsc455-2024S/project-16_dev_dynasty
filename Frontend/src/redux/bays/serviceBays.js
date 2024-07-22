import axios from 'axios';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const getAllBays = async () => {
    try {
        const response = await axios.get(`${BACKEND_URL}/bays`);
        return response.data.result;
    } catch (error) {
        console.error('Error fetching bays:', error);
    }
}

const getBay = async (bayid) => {
    try {
        const response = await axios.get(`${BACKEND_URL}/bays/${bayid}`);
        return response.data.result;
    } catch (error) {
        console.error(`Error fetching bay with id ${bayid}:`, error);
    }
}

export default {
    getAllBays,
    getBay
}