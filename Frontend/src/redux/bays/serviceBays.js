import axios from 'axios';

const getAllBays = async () => {
    try {
        const response = await axios.get('http://localhost:3000/bays');
        return response.data.result;
    } catch (error) {
        console.error('Error fetching bays:', error);
    }
}

const getBay = async (bayid) => {
    try {
        const response = await axios.get(`http://localhost:3000/bays/${bayid}`);
        return response.data.result;
    } catch (error) {
        console.error(`Error fetching bay with id ${bayid}:`, error);
    }
}

export default {
    getAllBays,
    getBay
}