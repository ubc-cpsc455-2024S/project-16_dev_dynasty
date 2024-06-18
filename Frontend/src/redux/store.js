import { configureStore } from '@reduxjs/toolkit'
import { houseSlice } from './houses/sliceHouses'
import { baySlice } from './bays/sliceBays'

export const store = configureStore({
  reducer: {
    bays: baySlice,
    houses: houseSlice,
  },
})
