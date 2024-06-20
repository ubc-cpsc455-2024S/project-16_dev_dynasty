import { createSlice } from '@reduxjs/toolkit'
import {
  getAllHousesAsync,
  getHousesInbayAsync,
  getHouseInAbayAsync,
  getHouseAsync,
  addHouseAsync,
  deleteHouseAsync,
  updateHouseAsync,
  bayToHouseAsync,
} from './thunksHouses'

export const INITIAL_STATE = {
  list: [],
  findHouse: null,
  inbayList: [],
  inbayHouse: null,
  bayHouseMap: {20: null,
    19: null,
    18: null,
    17: null,
    16: null,
    15: null,
    14: null,
    13: null,
    12: null,
    11: null,
    10: null,
    9: null,
    8: null,
    7: null,
    6: null,
    5: null,
    4: null,
    3: null,
    2: null,
    1: null
  },
  status: {
    getAll: 'idle',
    getInBay: 'idle',
    getOneInABay: 'idle',
    getOne: 'idle',
    add: 'idle',
    delete: 'idle',
    update: 'idle',
    bayToHouse: 'idle'
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
        state.status.getAll = 'pending';
      })
      .addCase(getAllHousesAsync.fulfilled, (state, action) => {
        state.status.getAll = 'fulfilled';
        state.list = action.payload;
      })
      .addCase(getAllHousesAsync.rejected, (state, action) => {
        state.status.getAll = 'rejected';
        state.error = action.error.message;
      })
      // Handle getHouseAsync
      .addCase(getHouseAsync.pending, state => {
        state.status.getOne = 'pending';
      })
      .addCase(getHouseAsync.fulfilled, (state, action) => {
        state.status.getOne = 'fulfilled';
        // const index = state.list.findIndex(
        //   house => house.house_id === action.payload.house_id
        // )
        // if (index !== -1) {
        //   state.list[index] = action.payload
        // } else {
        //   state.list.push(action.payload) // Optionally add to list if not found
        // }
        state.findHouse = action.payload;
      })
      .addCase(getHouseAsync.rejected, (state, action) => {
        state.status.getOne = 'rejected';
        state.error = action.error.message;
      })
      // Handle getHouseAsync
      .addCase(getHousesInbayAsync.pending, state => {
        state.status.getInBay = 'pending';
      })
      .addCase(getHousesInbayAsync.fulfilled, (state, action) => {
        state.status.getInBay = 'fulfilled';
        state.inbayList = action.payload;
      })
      .addCase(getHousesInbayAsync.rejected, (state, action) => {
        state.status.getInBay = 'rejected';
        state.error = action.error.message;
      })
      // Handle getHouseAsync
      .addCase(getHouseInAbayAsync.pending, state => {
        state.status.getOneInABay = 'pending';
      })
      .addCase(getHouseInAbayAsync.fulfilled, (state, action) => {
        state.status.getOneInABay = 'fulfilled';
        state.inbayHouse = action.payload;
        if (action.payload) {
          const bid = action.payload.bay_id;
          state.bayHouseMap[bid] = action.payload;
        }
      })
      .addCase(getHouseInAbayAsync.rejected, (state, action) => {
        state.status.getOneInABay = 'rejected';
        state.error = action.error.message;
      })
      // Handle addHouseAsync
      .addCase(addHouseAsync.pending, state => {
        state.status.add = 'pending';
      })
      .addCase(addHouseAsync.fulfilled, (state, action) => {
        state.status.add = 'fulfilled';
        state.list.push(action.payload); // Add the new house to the list
      })
      .addCase(addHouseAsync.rejected, (state, action) => {
        state.status.add = 'rejected';
        state.error = action.error.message;
      })
      // Handle house deletion
      .addCase(deleteHouseAsync.pending, state => {
        state.status.delete = 'pending';
      })
      .addCase(deleteHouseAsync.fulfilled, (state, action) => {
        state.status.delete = 'fulfilled';
        state.list = state.list.filter(
          house => house.house_id !== action.payload
        );
      })
      .addCase(deleteHouseAsync.rejected, (state, action) => {
        state.status.delete = 'rejected';
        state.error = action.error.message;
      })

      // Handle house update
      .addCase(updateHouseAsync.pending, state => {
        state.status.update = 'pending';
      })
      .addCase(updateHouseAsync.fulfilled, (state, action) => {
        state.status.update = 'fulfilled';
        const index = state.list.findIndex(
          house => house.house_id === action.payload.house_id
        );
        if (index !== -1) {
          state.list[index] = action.payload; // Update the house if found
        } else {
          console.error('updateHouse action fullfilled by house not found in list');
        }
      })
      .addCase(updateHouseAsync.rejected, (state, action) => {
        state.status.update = 'rejected';
        state.error = action.error.message;
      })
      // Handle house bay update
      .addCase(bayToHouseAsync.pending, state => {
        state.status.bayToHouse = 'pending';
      })
      .addCase(bayToHouseAsync.fulfilled, (state, action) => {
        state.status.bayToHouse = 'fulfilled';
        const index = state.list.findIndex(
          house => house.house_id === action.payload.house_id
        );
        if (index !== -1) {
          state.list[index] = { 
            ...state.list[index], 
            bay_id: action.payload.house_id, 
            bay_name: `Bay ${action.payload.house_id}`};
        } else {
          console.error('bayToHouse action fullfilled by house not found in list');
        }
      })
      .addCase(bayToHouseAsync.rejected, (state, action) => {
        state.status.bayToHouse = 'rejected';
        state.error = action.error.message;
      })
  },
})

export default houseSlice.reducer
