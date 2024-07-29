import { createSlice } from '@reduxjs/toolkit'
import {
  deleteChecklistAsync,
  getChecklistAsync,
  putChecklistAsync,
} from './thunksChecklists.js'

const INITIAL_STATE = {
  data: null,
  status: {
    getOne: 'idle',
    putOne: 'idle',
    delete: 'idle',
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
        state.data = action.payload
      })
      .addCase(getChecklistAsync.rejected, (state, action) => {
        state.status.getOne = 'rejected'
        state.error = action.error.message
      })
      // Handle putChecklistAsync
      .addCase(putChecklistAsync.pending, state => {
        state.status.putOne = 'pending'
      })
      .addCase(putChecklistAsync.fulfilled, (state, action) => {
        state.status.putOne = 'fulfilled'
        state.data = action.payload
      })
      .addCase(putChecklistAsync.rejected, (state, action) => {
        state.status.putOne = 'rejected'
        state.error = action.error.message
      })
      // Handle deleteChecklistAsync
      .addCase(deleteChecklistAsync.pending, state => {
        state.status.delete = 'pending'
      })
      .addCase(deleteChecklistAsync.fulfilled, state => {
        state.status.delete = 'fulfilled'
        state.data = null
      })
      .addCase(deleteChecklistAsync.rejected, (state, action) => {
        state.status.delete = 'rejected'
        state.error = action.error.message
      })
  },
})

export default checklistSlice.reducer
