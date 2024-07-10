import { createAsyncThunk } from '@reduxjs/toolkit'
import CustomerService from './serviceCustomers'

const actionTypes = {
  GET_CUSTOMERS: 'customers/getAll',
  GET_CUSTOMER: 'customers/get',
  ADD_CUSTOMER: 'customers/add',
  UPDATE_CUSTOMER: 'customers/update',
  DELETE_CUSTOMER: 'customers/delete',
}

// prettier-ignore
export const getAllCustomersAsync = createAsyncThunk(
  actionTypes.GET_CUSTOMERS,
  async () => {
    return await CustomerService.getAllCustomers();
  }
);

// prettier-ignore
export const getCustomerAsync = createAsyncThunk(
  actionTypes.GET_CUSTOMER,
  async (customerId) => {
    return await CustomerService.getCustomer(customerId);
  }
);

// prettier-ignore
export const addCustomerAsync = createAsyncThunk(
  actionTypes.ADD_CUSTOMER,
  async (customerData) => {
    return await CustomerService.addCustomer(customerData);
  }
);

// prettier-ignore
export const updateCustomerAsync = createAsyncThunk(
  actionTypes.UPDATE_CUSTOMER,
  async ({ customerId, customerData }) => {
    return await CustomerService.updateCustomer(customerId, customerData);
  }
);

// prettier-ignore
export const deleteCustomerAsync = createAsyncThunk(
  actionTypes.DELETE_CUSTOMER,
  async (customerId) => {
    return await CustomerService.deleteCustomer(customerId);
  }
);
