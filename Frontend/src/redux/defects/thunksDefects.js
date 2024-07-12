import { createAsyncThunk } from '@reduxjs/toolkit';
import * as defectService from './serviceDefect';

export const fetchDefectsByHouseId = createAsyncThunk(
  'defects/fetchByHouseId',
  async (houseId, thunkAPI) => {
    try {
      const defects = await defectService.getDefectsByHouseId(houseId);
      return defects;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchDefectById = createAsyncThunk(
  'defects/fetchById',
  async ({ houseId, defectId }, thunkAPI) => {
    try {
      const defect = await defectService.getDefectById(houseId, defectId);
      return defect;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const createDefect = createAsyncThunk(
  'defects/create',
  async ({ houseId, defectData }, thunkAPI) => {
    try {
      const newDefect = await defectService.addDefect(houseId, defectData);
      return newDefect;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const modifyDefect = createAsyncThunk(
  'defects/update',
  async ({ houseId, defectId, defectData }, thunkAPI) => {
    try {
      const updatedDefect = await defectService.updateDefect(houseId, defectId, defectData);
      return updatedDefect;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const removeDefect = createAsyncThunk(
  'defects/delete',
  async ({ houseId, defectId }, thunkAPI) => {
    try {
      await defectService.deleteDefect(houseId, defectId);
      return defectId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
