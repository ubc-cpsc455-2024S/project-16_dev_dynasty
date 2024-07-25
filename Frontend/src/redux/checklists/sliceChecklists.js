import { createSlice } from '@reduxjs/toolkit'
import { getChecklistAsync } from './thunksChecklists.js'

const INITIAL_STATE = {
  checklistData: null,
  status: {
    getOne: 'idle',
  },
  error: null,
}

const checklistSlice = createSlice({
  name: 'checklists',
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: builder => {
    builder
      // Handle getChecklistAsync
      .addCase(getChecklistAsync.pending, state => {
        state.status.getOne = 'pending'
      })
      .addCase(getChecklistAsync.fulfilled, (state, action) => {
        state.status.getOne = 'fulfilled'
        state.checklistData = action.payload
      })
      .addCase(getChecklistAsync.rejected, (state, action) => {
        state.status.getOne = 'rejected'
        state.error = action.error.message
      })
  },
})

export default checklistSlice.reducer
