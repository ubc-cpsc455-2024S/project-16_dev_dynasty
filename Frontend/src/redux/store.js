import { configureStore } from '@reduxjs/toolkit'
import houseSlice from './houses/sliceHouses'
import baySlice from './bays/sliceBays'
import customerSlice from './customers/sliceCustomers'
import sidebarSlice from './sidebar/sidebarSlice'

export const store = configureStore({
  reducer: {
    bays: baySlice,
    houses: houseSlice,
    customers: customerSlice,
    sidebar: sidebarSlice,
  },
})

export default store
