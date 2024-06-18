import { configureStore } from '@reduxjs/toolkit'
import  houseSlice  from './houses/sliceHouses'
import  baySlice  from './bays/sliceBays'
import sidebarSlice from '../store/sidebarSlice';

export const store = configureStore({
  reducer: {
    bays: baySlice,
    houses: houseSlice,
    sidebar: sidebarSlice
    
  },
})

export default store;