import { createSlice } from '@reduxjs/toolkit'
import {
  fetchDocumentsByHouseId,
  addDocumentAsync,
  updateDocumentAsync,
  deleteDocumentAsync,
} from './thunksDocuments'

const documentsSlice = createSlice({
  name: 'documents',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchDocumentsByHouseId.pending, state => {
        state.loading = true
      })
      .addCase(fetchDocumentsByHouseId.fulfilled, (state, action) => {
        state.loading = false
        state.list = action.payload
      })
      .addCase(fetchDocumentsByHouseId.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(addDocumentAsync.pending, state => {
        state.loading = true
      })
      .addCase(addDocumentAsync.fulfilled, (state, action) => {
        state.loading = false
        state.list.push(action.payload)
      })
      .addCase(addDocumentAsync.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(updateDocumentAsync.pending, state => {
        state.loading = true
      })
      .addCase(updateDocumentAsync.fulfilled, (state, action) => {
        state.loading = false
        const index = state.list.findIndex(
          document => document._id === action.payload._id
        )
        if (index !== -1) {
          state.list[index] = action.payload
        }
      })
      .addCase(updateDocumentAsync.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
      .addCase(deleteDocumentAsync.pending, state => {
        state.loading = true
      })
      .addCase(deleteDocumentAsync.fulfilled, (state, action) => {
        state.loading = false
        state.list = state.list.filter(
          document => document._id !== action.payload._id
        )
      })
      .addCase(deleteDocumentAsync.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export default documentsSlice.reducer
