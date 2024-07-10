import { createSlice } from '@reduxjs/toolkit'
import {
  getAllCustomersAsync,
  getCustomerAsync,
  addCustomerAsync,
  updateCustomerAsync,
  deleteCustomerAsync,
} from './thunksCustomers'

export const INITIAL_STATE = {
  list: [],
  findCustomer: null,
  status: {
    getAll: 'idle',
    get: 'idle',
    add: 'idle',
    update: 'idle',
    delete: 'idle',
  },
  error: null,
}

const customerSlice = createSlice({
  name: 'customers',
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: builder => {
    builder
      // Handle getAllCustomersAsync
      .addCase(getAllCustomersAsync.pending, state => {
        state.status.getAll = 'pending'
      })
      .addCase(getAllCustomersAsync.fulfilled, (state, action) => {
        state.status.getAll = 'fulfilled'
        console.log('action.payload', action.payload)
        state.list = action.payload
      })
      .addCase(getAllCustomersAsync.rejected, (state, action) => {
        state.status.getAll = 'rejected'
        state.error = action.error.message
      })
      // Handle getCustomerAsync
      .addCase(getCustomerAsync.pending, state => {
        state.status.get = 'pending'
      })
      .addCase(getCustomerAsync.fulfilled, (state, action) => {
        state.status.get = 'fulfilled'
        state.findCustomer = action.payload
      })
      .addCase(getCustomerAsync.rejected, (state, action) => {
        state.status.get = 'rejected'
        state.error = action.error.message
      })
      // Handle addCustomerAsync
      .addCase(addCustomerAsync.pending, state => {
        state.status.add = 'pending'
      })
      .addCase(addCustomerAsync.fulfilled, (state, action) => {
        state.status.add = 'fulfilled'
        state.list.push(action.payload) // Add the new customer to the list
      })
      .addCase(addCustomerAsync.rejected, (state, action) => {
        state.status.add = 'rejected'
        state.error = action.error.message
      })
      // Handle updateCustomerAsync
      .addCase(updateCustomerAsync.pending, state => {
        state.status.update = 'pending'
      })
      .addCase(updateCustomerAsync.fulfilled, (state, action) => {
        state.status.update = 'fulfilled'
        // Update customer list
        const index = state.list.findIndex(
          customer => customer._id === action.payload._id
        )
        if (index !== -1) {
          state.list[index] = action.payload
        } else {
          console.error(
            'updateCustomer action fulfilled but customer not found in list'
          )
        }
      })
      .addCase(updateCustomerAsync.rejected, (state, action) => {
        state.status.update = 'rejected'
        state.error = action.error.message
      })
      // Handle deleteCustomerAsync
      .addCase(deleteCustomerAsync.pending, state => {
        state.status.delete = 'pending'
      })
      .addCase(deleteCustomerAsync.fulfilled, (state, action) => {
        state.status.delete = 'fulfilled'
        state.list = state.list.filter(
          customer => customer._id !== action.payload._id
        )
      })
      .addCase(deleteCustomerAsync.rejected, (state, action) => {
        state.status.delete = 'rejected'
        state.error = action.error.message
      })
  },
})

export default customerSlice.reducer
