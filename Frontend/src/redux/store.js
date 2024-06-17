import { configureStore } from '@reduxjs/toolkit'
import { houseSlice } from './sliceHouses'
import { baySlice } from './sliceBays'

export const store = configureStore({
  reducer: {
    bays: baySlice,
    houses: houseSlice,
  },
})
