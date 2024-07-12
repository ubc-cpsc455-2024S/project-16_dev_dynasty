import { createAsyncThunk } from '@reduxjs/toolkit';
import * as serviceDefects from './serviceDefects';

export const fetchDefectsByHouseId = createAsyncThunk(
  'defects/fetchByHouseId',
  async (houseId) => {
    const response = await serviceDefects.getDefectsByHouseId(houseId);
    return response;
  }
);

export const addDefectAsync = createAsyncThunk(
  'defects/addDefect',
  async ({ houseId, defectData }) => {
    const response = await serviceDefects.addDefect(houseId, defectData);
    return response;
  }
);

export const updateDefectAsync = createAsyncThunk(
  'defects/updateDefect',
  async ({ houseId, defectId, defectData }) => {
    const response = await serviceDefects.updateDefect(houseId, defectId, defectData);
    return response;
  }
);

export const deleteDefectAsync = createAsyncThunk(
  'defects/deleteDefect',
  async ({ houseId, defectId }) => {
    const response = await serviceDefects.deleteDefect(houseId, defectId);
    return response;
  }
);
