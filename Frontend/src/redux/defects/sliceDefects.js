import { createSlice } from '@reduxjs/toolkit';
import {
  fetchDefectsByHouseId,
  fetchDefectById,
  createDefect,
  modifyDefect,
  removeDefect,
} from './thunksDefects';

const defectsSlice = createSlice({
  name: 'defects',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDefectsByHouseId.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDefectsByHouseId.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchDefectsByHouseId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchDefectById.fulfilled, (state, action) => {
        // Handle specific defect fetched
      })
      .addCase(createDefect.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(modifyDefect.fulfilled, (state, action) => {
        const index = state.list.findIndex(defect => defect._id === action.payload._id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(removeDefect.fulfilled, (state, action) => {
        state.list = state.list.filter(defect => defect._id !== action.meta.arg.defectId);
      });
  },
});

export default defectsSlice.reducer;
