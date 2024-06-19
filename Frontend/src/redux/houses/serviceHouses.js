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
        const response = await axios.get(`http://localhost:3000/houses/${houseid}`);
        return response.data.result;
    } catch (error) {
        console.error(`Error fetching house with id ${houseid}:`, error);
    }
}

const getHousesInbays = async () => {
    try {
        const response = await axios.get(`http://localhost:3000/houses/inbay`);
        return response.data.result;
    } catch (error) {
        console.error(`Error fetching houses that are in production:`, error);
    }
}


const getHouseInAbay = async (bayId) => {
    try {
        const response = await axios.get(`http://localhost:3000/houses/inbay/${bayId}`);
        return response.data.result;
    } catch (error) {
        console.error(`Error fetching houses that are in production:`, error);
    }
}

const addHouse = async (houseData) => {
    try {
        const response = await axios.post(`http://localhost:3000/houses`, houseData);
        return response.data.result;
    } catch (error) {
        console.error(`Error fetching houses that are in production:`, error);
    }
}

const deleteHouse = async (houseId) => {
    try {
        const response = await axios.delete(`http://localhost:3000/houses/${houseId}`);
        return response.data.result;
    } catch (error) {
        console.error (`Error deleting house with id  ${houseId} :`, error);
    }
}

const updateHouse = async (houseId, houseData) => {
    try {
        const response = await axios.put(`http://localhost:3000/houses/${houseId}`, houseData);
        return response.data.result;
    } catch (error) {
        console.error (`Error updating house with id  ${houseId} :`, error);
    }
}

const bayToHouse = async (houseId, bayId) => {
    try {
        const response = await axios.patch(`http://localhost:3000/houses/${houseId}/${bayId}`);
        return response.data;
    } catch (error) {
        console.error (`Error updating house with id  ${houseId} to bay ${bayId}:`, error);
    }
}

export default {
    getAllHouses,
    getHouse,
    getHousesInbays,
    getHouseInAbay,
    addHouse,
    deleteHouse,
    updateHouse,
    bayToHouse
}