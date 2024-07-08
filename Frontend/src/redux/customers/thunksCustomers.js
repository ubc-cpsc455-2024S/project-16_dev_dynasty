import { createAsyncThunk } from '@reduxjs/toolkit'
import CustomerService from './serviceCustomers.js'

const actionTypes = {
  GET_CUSTOMERS: 'customers',
  GET_CUSTOMER: 'customers/customer',
  ADD_CUSTOMER: 'customers/add',
  DELETE_CUSTOMER: 'customers/delete',
  UPDATE_CUSTOMER: 'customers/update',
}

export const addCustomerAsync = createAsyncThunk(
  actionTypes.ADD_CUSTOMER,
  async customerData => {
    return await CustomerService.addCustomer(customerData)
  }
)
