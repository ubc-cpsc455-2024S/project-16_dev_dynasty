import { createAsyncThunk } from '@reduxjs/toolkit'

const actionTypes = {
  GET_HOUSES: 'houses',
  GET_HOUSE: 'houses/house',
  ADD_HOUSE: 'houses/add',
  DELETE_HOUSE: 'houses/delete',
  UPDATE_HOUSE: 'houses/update',
  BAY_HOUSES: 'houses/housebay'
}

// prettier-ignore
export const getAllHousesAsync = createAsyncThunk(actionTypes.GET_HOUSES, async () => {
    const response = await axios('http://localhost:3000/houses')
    return response.data.result
  }
)

// prettier-ignore
export const getHouseAsync = createAsyncThunk(actionTypes.GET_HOUSE, async (houseId) => {
    const response = await axios(`http://localhost:3000/houses/${house}`)
    return response.data.result;
  });

// prettier-ignore
export const addHouseAsync = createAsyncThunk(actionTypes.addHouseAsync, async (houseData) => {
    const response = await axios.post("http://localhost:3000/houses", houseData);
    return response.data.result;
  });

// prettier-ignore
export const deleteHouseAsync = createAsyncThunk(actionTypes.DELETE_HOUSE, async (houseId) => {
    const response = await axios.delete(`http://localhost:3000/houses/${houseId}`);
    return response.data.result;  // Assuming the backend doesn't return the deleted object
  });

// prettier-ignore
export const updateHouseAsync = createAsyncThunk(actionTypes.UPDATE_HOUSE, async ({ houseId, houseData }) => {
    const response = await axios.put(`http://localhost:3000/houses/${houseId}`, houseData);
    return response.data.result;
  });
