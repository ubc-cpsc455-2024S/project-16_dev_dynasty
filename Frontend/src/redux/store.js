import { configureStore } from '@reduxjs/toolkit'
import houseSlice from './houses/sliceHouses'
import baySlice from './bays/sliceBays'
import sidebarSlice from './sidebar/sidebarSlice'
import customerSlice from './customers/sliceCustomers'

export const store = configureStore({
  reducer: {
    bays: baySlice,
    houses: houseSlice,
    customers: customerSlice,
    sidebar: sidebarSlice,
  },
})

export default store
