import { configureStore } from '@reduxjs/toolkit'
import houseSlice from './houses/sliceHouses'
import baySlice from './bays/sliceBays'
import customerSlice from './customers/sliceCustomers'
import sidebarSlice from './sidebar/sidebarSlice'
import defectsReducer from './defects/sliceDefects'
import checklistsSlice from './checklists/sliceChecklists'
import documentsReducer from './documents/sliceDocuments';

export const store = configureStore({
  reducer: {
    bays: baySlice,
    houses: houseSlice,
    customers: customerSlice,
    sidebar: sidebarSlice,
    defects: defectsReducer,
    documents: documentsReducer,
    checklists: checklistsSlice,
  },
})

export default store
