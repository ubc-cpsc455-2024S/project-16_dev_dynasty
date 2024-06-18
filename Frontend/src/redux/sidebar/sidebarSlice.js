import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
};

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isOpen = !state.isOpen;
    },
    closeSidebar: (state) => {
      state.isOpen = false;
    },
  },
});

export const { toggleSidebar, closeSidebar } = sidebarSlice.actions;

export default sidebarSlice.reducer;
