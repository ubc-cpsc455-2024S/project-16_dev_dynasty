import { createSlice } from '@reduxjs/toolkit'
import {
  getAllHousesAsync,
  getHouseAsync,
  addHouseAsync,
  deleteHouseAsync,
  updateHouseAsync,
} from './thunksHouses'

export const INITIAL_STATE = {
  list: [],
  status: {
    getAll: 'idle',
    getOne: 'idle',
    add: 'idle',
    delete: 'idle',
    update: 'idle',
  },
  error: null,
}

export const houseSlice = createSlice({
  name: 'houses',
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: builder => {
    builder
      // Handle getAllHousesAsync
      .addCase(getAllHousesAsync.pending, state => {
        state.status.getAll = 'pending'
      })
      .addCase(getAllHousesAsync.fulfilled, (state, action) => {
        state.status.getAll = 'fulfilled'
        state.list = action.payload
      })
      .addCase(getAllHousesAsync.rejected, (state, action) => {
        state.status.getAll = 'rejected'
        state.error = action.error.message
      })
      // Handle getHouseAsync
      .addCase(getHouseAsync.pending, state => {
        state.status.getOne = 'pending'
      })
      .addCase(getHouseAsync.fulfilled, (state, action) => {
        state.status.getOne = 'fulfilled'
        const index = state.list.findIndex(
          house => house.house_id === action.payload.house_id
        )
        if (index !== -1) {
          state.list[index] = action.payload
        } else {
          state.list.push(action.payload) // Optionally add to list if not found
        }
      })
      .addCase(getHouseAsync.rejected, (state, action) => {
        state.status.getOne = 'rejected'
        state.error = action.error.message
      })
      // Handle addHouseAsync
      .addCase(addHouseAsync.pending, state => {
        state.status.add = 'pending'
      })
      .addCase(addHouseAsync.fulfilled, (state, action) => {
        state.status.add = 'fulfilled'
        state.list.push(action.payload) // Add the new house to the list
      })
      .addCase(addHouseAsync.fulfilled, (state, action) => {
        state.status.add = 'rejected'
        state.error = action.error.message
      })
      // Handle house deletion
      .addCase(deleteHouseAsync.pending, state => {
        state.status.delete = 'pending'
      })
      .addCase(deleteHouseAsync.fulfilled, (state, action) => {
        state.status.delete = 'fulfilled'
        state.list = state.list.filter(
          house => house.house_id !== action.payload
        )
      })
      .addCase(deleteHouseAsync.rejected, (state, action) => {
        state.status.delete = 'rejected'
        state.error = action.error.message
      })

      // Handle house update
      .addCase(updateHouseAsync.pending, state => {
        state.status.update = 'pending'
      })
      .addCase(updateHouseAsync.fulfilled, (state, action) => {
        state.status.update = 'fulfilled'
        const index = state.list.findIndex(
          house => house.house_id === action.payload.house_id
        )
        if (index !== -1) {
          state.list[index] = action.payload // Update the house if found
        }
      })
      .addCase(updateHouseAsync.rejected, (state, action) => {
        state.status.update = 'rejected'
        state.error = action.error.message
      })
  },
})

export default houseSlice.reducer
