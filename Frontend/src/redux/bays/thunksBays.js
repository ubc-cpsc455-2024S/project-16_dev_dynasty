import { createAsyncThunk } from '@reduxjs/toolkit';
import BayService from './serviceBays'

const actionTypes = {
  GET_BAYS: 'bays',
  GET_EMPTY_BAYS: 'bays/empty',
  GET_BAY: 'bays/bay',
}

// Fetch all bays
// prettier-ignore
export const getAllBaysAsync = createAsyncThunk(
  actionTypes.GET_BAYS, 
  async () => {
  return await BayService.getAllBays();
})


export const getAvailableBaysAsync = createAsyncThunk(
  actionTypes.GET_EMPTY_BAYS, 
  async () => {
  return await BayService.getAvailableBays();
})

// Fetch a specific bay by ID
// prettier-ignore
export const getBayAsync = createAsyncThunk(
  actionTypes.GET_BAY, 
  async (bayId) => {
  return await BayService.getBay(bayId);
})
