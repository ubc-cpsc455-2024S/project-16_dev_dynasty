import { createSlice } from '@reduxjs/toolkit'
import { addCustomerAsync } from './thunksCustomers.js'

const INITIAL_STATE = {
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

const customerSlice = createSlice({
  name: 'customers',
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: builder => {
    builder
      // Handle addCustomerAsync
      .addCase(addCustomerAsync.pending, state => {
        state.status.add = 'pending'
      })
      .addCase(addCustomerAsync.fulfilled, (state, action) => {
        state.status.add = 'fulfilled'
        state.list.push(action.payload)
      })
      .addCase(addCustomerAsync.rejected, (state, action) => {
        state.status.add = 'rejected'
        state.error = action.error.message
      })
  },
})

export default customerSlice.reducer
