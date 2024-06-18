import axios from 'axios';

const getAllHouses = async () => {
    try {
        const response = await axios.get('http://localhost:3000/houses');
        return response.data.result;
    } catch (error) {
        console.error('Error fetching houses:', error);
    }
}

const getHouse = async (houseid) => {
    try {
        const response = await axios.get(`http://localhost:3000/bays/${houseid}`);
        return response.data.result;
    } catch (error) {
        console.error(`Error fetching house with id ${houseid}:`, error);
    }
}

export default {
    getAllHouses,
    getHouse
}