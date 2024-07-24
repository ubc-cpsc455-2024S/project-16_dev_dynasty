import { createSlice } from '@reduxjs/toolkit'

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
})

export default checklistSlice.reducer
