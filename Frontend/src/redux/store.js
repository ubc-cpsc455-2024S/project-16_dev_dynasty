import { configureStore } from '@reduxjs/toolkit'
import houseSlice from './houses/sliceHouses'
import baySlice from './bays/sliceBays'
import authSlice from './auth/sliceAuth'
import customerSlice from './customers/sliceCustomers'
import sidebarSlice from './sidebar/sidebarSlice'
import defectsReducer from './defects/sliceDefects';

export const store = configureStore({
  reducer: {
    bays: baySlice,
    houses: houseSlice,
    auth: authSlice,
    customers: customerSlice,
    sidebar: sidebarSlice,
    defects: defectsReducer,
  },
})

export default store
