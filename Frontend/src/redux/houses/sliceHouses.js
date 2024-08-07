import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import {
  getAllHousesAsync,
  getHousesInbayAsync,
  getHouseAsync,
  addHouseAsync,
  deleteHouseAsync,
  updateHouseAsync,
  bayToHouseAsync,
} from './thunksHouses'

export const INITIAL_STATE = {
  list: [],
  findHouse: null,
  inBayList: [],
  status: {
    getAll: 'idle',
    getInBay: 'idle',
    getOneInABay: 'idle',
    getOne: 'idle',
    add: 'idle',
    delete: 'idle',
    update: 'idle',
    bayToHouse: 'idle',
  },
  error: null,
}

const houseSlice = createSlice({
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
        state.findHouse = action.payload
      })
      .addCase(getHouseAsync.rejected, (state, action) => {
        state.status.getOne = 'rejected'
        state.error = action.error.message
      })
      // Handle getHousesInBayAsync
      .addCase(getHousesInbayAsync.pending, state => {
        state.status.getInBay = 'pending'
      })
      .addCase(getHousesInbayAsync.fulfilled, (state, action) => {
        state.status.getInBay = 'fulfilled'
        state.inBayList = action.payload
      })
      .addCase(getHousesInbayAsync.rejected, (state, action) => {
        state.status.getInBay = 'rejected'
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
      .addCase(addHouseAsync.rejected, (state, action) => {
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
          house => house._id !== action.payload._id
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
        // Update house list
        const indexList = state.list.findIndex(
          house => house._id === action.payload._id
        )
        if (indexList !== -1) {
          state.list[indexList] = action.payload
        } else {
          console.error('slice - house not found in list')
        }

        // Update in Bay List
        const indexInBayList = state.inBayList.findIndex(
          house => house._id === action.payload._id
        )
        if (indexInBayList !== -1) {
          state.inBayList[indexInBayList] = action.payload
        } else {
          console.error('slice - house not found inBayList')
        }

        // Update Find house
        if (state.findHouse && state.findHouse._id === action.payload._id) {
          state.findHouse = action.payload
        }
      })
      .addCase(updateHouseAsync.rejected, (state, action) => {
        state.status.update = 'rejected'
        state.error = action.error.message
      })
      // Handle house bay update
      .addCase(bayToHouseAsync.pending, state => {
        state.status.bayToHouse = 'pending'
      })
      .addCase(bayToHouseAsync.fulfilled, (state, action) => {
        state.status.bayToHouse = 'fulfilled'
        const modifiedHouse = action.payload

        const inBayListCopy = [...state.inBayList]
        const index = inBayListCopy.findIndex(house => {
          return house._id === modifiedHouse._id
        })

        if (index !== -1) {
          inBayListCopy[index] = modifiedHouse
          state.inBayList = inBayListCopy
        } else if (inBayListCopy.length === 0) {
        } else {
          console.error(
            'bayToHouse action fullfilled by house not found in list'
          )
        }
        // Update Find house
        if (
          state.findHouse != null &&
          state.findHouse._id === modifiedHouse._id
        ) {
          state.findHouse = modifiedHouse
        }
      })
      .addCase(bayToHouseAsync.rejected, (state, action) => {
        state.status.bayToHouse = 'rejected'
        state.error = action.error.message
        toast.error('This bay is currently occupied, try another bay')
      })
  },
})

export default houseSlice.reducer
