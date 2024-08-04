import { createSlice } from '@reduxjs/toolkit'
import { getEventLogsAsync } from './thunkLog'

const INITIAL_LOG_STATE = {
  eventLogs: [],
  status: {
    getAllLogs: 'idle',
  },
  error: null,
}

const logSlice = createSlice({
  name: 'logs',
  initialState: INITIAL_LOG_STATE,
  reducers: {},
  extraReducers: builder => {
    builder
      // handle getAll
      .addCase(getEventLogsAsync.pending, state => {
        state.status.getAllLogs = 'pending'
      })
      .addCase(getEventLogsAsync.fulfilled, (state, action) => {
        state.status.getAllLogs = 'fulfilled'
        console.log('logs are: ', action.payload)
        state.eventLogs = action.payload
        state.error = null
      })
      .addCase(getEventLogsAsync.rejected, (state, action) => {
        state.status.getAllLogs = 'rejected'
        state.error = action.error.message
      })
  },
})

export default logSlice.reducer
