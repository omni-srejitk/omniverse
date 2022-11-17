import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filterDuration: 'All Time',
  filterBy: [],
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilterDuration: (state, action) => {
      state.filterDuration = action.payload;
    },
    applyFilter: (state, action) => {
      state.filterBy = action.payload;
    },
  },
});

export const { setFilterDuration } = filterSlice.actions;

export default filterSlice.reducer;
