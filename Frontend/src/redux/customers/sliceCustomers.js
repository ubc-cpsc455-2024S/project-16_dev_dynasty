import { createSlice } from '@reduxjs/toolkit'
import {
  addCustomerAsync,
  deleteCustomerAsync,
  getCustomersAsync,
} from './thunksCustomers.js'

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
      // Handle getCustomersAsync
      .addCase(getCustomersAsync.pending, state => {
        state.status.getAll = 'pending'
      })
      .addCase(getCustomersAsync.fulfilled, (state, action) => {
        state.status.getAll = 'fulfilled'
        state.list = action.payload
      })
      .addCase(getCustomersAsync.rejected, (state, action) => {
        state.status.getAll = 'rejected'
        state.error = action.error.message
      })
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
      // Handle deleteCustomerAsync
      .addCase(deleteCustomerAsync.pending, state => {
        state.status.delete = 'pending'
      })
      .addCase(deleteCustomerAsync.fulfilled, (state, action) => {
        state.status.delete = 'fulfilled'
        state.list = state.list.filter(
          customer => customer._id !== action.payload
        )
      })
      .addCase(deleteCustomerAsync.rejected, (state, action) => {
        state.status.delete = 'rejected'
        state.error = action.error.message
      })
  },
})

export default customerSlice.reducer
