import { createAsyncThunk } from '@reduxjs/toolkit';
import HouseService from './serviceHouses';

const actionTypes = {
  GET_HOUSES: 'houses',
  GET_HOUSE_INBAY: 'houses/inbay',
  GET_ONE_HOUSE_INBAY: 'houses/inbay/bayid',
  GET_HOUSE: 'houses/house',
  ADD_HOUSE: 'houses/add',
  DELETE_HOUSE: 'houses/delete',
  UPDATE_HOUSE: 'houses/update',
  BAY_HOUSE: 'houses/housebay',
};

// prettier-ignore
export const getAllHousesAsync = createAsyncThunk(
  actionTypes.GET_HOUSES,
  async ({ query, nplQuery, customerNameQuery, houseModelQuery }) => {
    return await HouseService.getAllHouses({ query, nplQuery, customerNameQuery, houseModelQuery });
  }
);

export const getHousesInbayAsync = createAsyncThunk(
  actionTypes.GET_HOUSE_INBAY,
  async () => {
    return await HouseService.getHousesInbays()
  }
)

export const getHouseInABayAsync = createAsyncThunk(
  actionTypes.GET_ONE_HOUSE_INBAY,
  async bayId => {
    return await HouseService.getHouseInABay(bayId)
  }
)

// prettier-ignore
export const getHouseAsync = createAsyncThunk(
  actionTypes.GET_HOUSE,
  async (houseId) => {
    return await HouseService.getHouse(houseId);
  });

// prettier-ignore
export const addHouseAsync = createAsyncThunk(
  actionTypes.ADD_HOUSE,
  async (houseData) => {
    return await HouseService.addHouse(houseData);
  });

// prettier-ignore
export const deleteHouseAsync = createAsyncThunk(
  actionTypes.DELETE_HOUSE,
  async (houseId) => {
    return await HouseService.deleteHouse(houseId);
  });

// prettier-ignore
export const updateHouseAsync = createAsyncThunk(
  actionTypes.UPDATE_HOUSE,
  async ({ houseId, houseData }) => {
    return await HouseService.updateHouse(houseId, houseData);
  });

export const bayToHouseAsync = createAsyncThunk(
  actionTypes.BAY_HOUSE,
  async ({ houseId, bayId }) => {
    return await HouseService.bayToHouse(houseId, bayId)
  }
)
