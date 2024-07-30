import { createAsyncThunk } from '@reduxjs/toolkit'
import ChecklistService from './serviceChecklists'

const actionTypes = {
  GET_CHECKLIST: 'checklists/get',
  PUT_CHECKLIST: 'checklists/put',
  DELETE_CHECKLIST: 'checklists/delete',
}

export const getChecklistAsync = createAsyncThunk(
  actionTypes.GET_CHECKLIST,
  async houseId => {
    return await ChecklistService.getChecklist(houseId)
  }
)

export const putChecklistAsync = createAsyncThunk(
  actionTypes.PUT_CHECKLIST,
  async ({ houseId, checklistData = {} }) => {
    return await ChecklistService.putChecklist(houseId, checklistData)
  }
)

export const deleteChecklistAsync = createAsyncThunk(
  actionTypes.DELETE_CHECKLIST,
  async houseId => {
    return await ChecklistService.deleteChecklist(houseId)
  }
)
