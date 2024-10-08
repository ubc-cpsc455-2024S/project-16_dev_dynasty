import { configureStore } from '@reduxjs/toolkit'
import houseSlice from './houses/sliceHouses'
import baySlice from './bays/sliceBays'
import authSlice from './auth/sliceAuth'
import logSlice from './logs/sliceLog'
import customerSlice from './customers/sliceCustomers'
import sidebarSlice from './sidebar/sidebarSlice'
import defectsReducer from './defects/sliceDefects'
import checklistsSlice from './checklists/sliceChecklists'
import documentsReducer from './documents/sliceDocuments'

export const store = configureStore({
  reducer: {
    bays: baySlice,
    houses: houseSlice,
    auth: authSlice,
    customers: customerSlice,
    sidebar: sidebarSlice,
    defects: defectsReducer,
    documents: documentsReducer,
    checklists: checklistsSlice,
    logs: logSlice,
  },
})

export default store
