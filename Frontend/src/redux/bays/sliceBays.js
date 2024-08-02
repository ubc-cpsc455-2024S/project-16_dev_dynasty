import { createSlice } from '@reduxjs/toolkit'
import { getAllBaysAsync, getBayAsync, getAvailableBaysAsync } from './thunksBays'

const INITIAL_BAY_STATE = {
  list: [],
  emptyBays: [],
  findBay: null,
  status: {
    getAll: 'idle',
    getEmpty: 'idle',
    getOne: 'idle',
  },
  error: null,
}

const baySlice = createSlice({
  name: 'bays',
  initialState: INITIAL_BAY_STATE,
  reducers: {},
  extraReducers: builder => {
    builder
      // Handle all bays fetching
      .addCase(getAllBaysAsync.pending, (state) => {
        state.status.getAll = 'pending';
      })
      .addCase(getAllBaysAsync.fulfilled, (state, action) => {
        state.status.getAll = 'fulfilled';
        state.list = action.payload;
      })
      .addCase(getAllBaysAsync.rejected, (state, action) => {
        state.status.getAll = 'rejected';
        state.error = action.error.message;
      })
      // Handle empty bays fetching
      .addCase(getAvailableBaysAsync.pending, (state) => {
        state.status.getEmpty = 'pending';
      })
      .addCase(getAvailableBaysAsync.fulfilled, (state, action) => {
        state.status.getEmpty = 'fulfilled';
        state.emptyBays = action.payload;
      })
      .addCase(getAvailableBaysAsync.rejected, (state, action) => {
        state.status.getEmpty = 'rejected';
        state.error = action.error.message;
      })
      // Handle fetching a specific bay
      .addCase(getBayAsync.pending, (state) => {
        state.status.getOne = 'pending';
      })
      .addCase(getBayAsync.fulfilled, (state, action) => {
        state.status.getOne = 'fulfilled';
        state.findBay = action.payload;
      })
      .addCase(getBayAsync.rejected, (state, action) => {
        state.status.getOne = 'rejected'
        state.error = action.error.message
      })
  },
})


export default baySlice.reducer
