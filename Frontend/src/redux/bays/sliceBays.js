import { createSlice } from '@reduxjs/toolkit'
import { getAllBaysAsync, getBayAsync } from './thunksBays'

export const INITIAL_BAY_STATE = {
  list: [],
  status: {
    getAll: 'idle',
    getOne: 'idle',
  },
  error: null,
}

export const baySlice = createSlice({
  name: 'bays',
  initialState: INITIAL_Bay_STATE,
  reducers: {},
  extraReducers: builder => {
    builder
      // Handle all bays fetching
      .addCase(getAllBaysAsync.pending, state => {
        state.status.getAll = 'pending'
      })
      .addCase(getAllBaysAsync.fulfilled, (state, action) => {
        state.status.getAll = 'fulfilled'
        state.list = action.payload
      })
      .addCase(getAllBaysAsync.rejected, (state, action) => {
        state.status.getAll = 'rejected'
        state.error = action.error.message
      })
      // Handle fetching a specific bay
      .addCase(getBayAsync.pending, state => {
        state.status.getOne = 'pending'
      })
      .addCase(getBayAsync.fulfilled, (state, action) => {
        state.status.getOne = 'fulfilled'
        const index = state.list.findIndex(
          bay => bay.bay_id === action.payload.bay_id
        )
        if (index !== -1) {
          state.list[index] = action.payload
        } else {
          // Optionally add the bay if not found in the list
          state.list.push(action.payload)
        }
      })
      .addCase(getBayAsync.rejected, (state, action) => {
        state.status.getOne = 'rejected'
        state.error = action.error.message
      })
  },
})

export default baySlice.reducer
