import { createSlice } from '@reduxjs/toolkit'
import {
  fetchDefectsByHouseId,
  addDefectAsync,
  updateDefectAsync,
  deleteDefectAsync,
} from './thunksDefects'

const defectsSlice = createSlice({
  name: 'defects',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchDefectsByHouseId.pending, state => {
        state.loading = true
      })
      .addCase(fetchDefectsByHouseId.fulfilled, (state, action) => {
        state.loading = false
        state.list = action.payload
      })
      .addCase(fetchDefectsByHouseId.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(addDefectAsync.pending, state => {
        state.loading = true
      })
      .addCase(addDefectAsync.fulfilled, (state, action) => {
        state.loading = false
        state.list.push(action.payload)
      })
      .addCase(addDefectAsync.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(updateDefectAsync.pending, state => {
        state.loading = true
      })
      .addCase(updateDefectAsync.fulfilled, (state, action) => {
        state.loading = false
        const index = state.list.findIndex(
          defect => defect._id === action.payload._id
        )
        if (index !== -1) {
          state.list[index] = action.payload
        }
      })
      .addCase(updateDefectAsync.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(deleteDefectAsync.pending, state => {
        state.loading = true
      })
      .addCase(deleteDefectAsync.fulfilled, (state, action) => {
        state.loading = false
        state.list = state.list.filter(
          defect => defect._id !== action.payload._id
        )
      })
      .addCase(deleteDefectAsync.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export default defectsSlice.reducer
