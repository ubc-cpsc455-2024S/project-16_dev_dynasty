import { createAsyncThunk } from '@reduxjs/toolkit'
import ChecklistService from './serviceChecklists'

const actionTypes = {
  GET_CHECKLIST: 'checklists/houseId/checklistName',
}

export const getChecklistAsync = createAsyncThunk(
  actionTypes.GET_CHECKLIST,
  async ({ houseId, checklistName }) => {
    return await ChecklistService.getChecklist(houseId, checklistName)
  }
)
