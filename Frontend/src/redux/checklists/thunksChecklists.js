import { createAsyncThunk } from '@reduxjs/toolkit'
import ChecklistService from './serviceChecklists'

const actionTypes = {
  GET_CHECKLIST: 'checklists/houseId/checklist',
}

export const getCustomerAsync = createAsyncThunk(
  actionTypes.GET_CHECKLIST,
  async ({ houseId, checklist }) => {
    return await ChecklistService.getCustomer(houseId, checklist)
  }
)
