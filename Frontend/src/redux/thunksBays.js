import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const actionTypes = {
  GET_BAYS: 'bays',
  GET_BAY: 'bay/addUser',
}

// Fetch all bays
// prettier-ignore
export const getAllBaysAsync = createAsyncThunk(actionTypes.GET_BAYS, async () => {
  const response = await axios('http://localhost:3000/bays')
  return response.data.result
})

// Fetch a specific bay by ID
// prettier-ignore
export const getBayAsync = createAsyncThunk(actionTypes.GET_BAY, async bayId => {
  const response = await axios(`http://localhost:3000/bays/${bayId}`)
  return response.data.result
})
