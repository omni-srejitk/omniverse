import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filterDuration: 'All Time',
  filterByItem: [],
  filterByStore: [],
  filteredDates: [],
  filteredItems: [],
  filteredStores: [],
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setDurationFilter: (state, action) => {
      state.filterDuration = action.payload;
    },
    setFilteredDates: (state, action) => {
      state.filteredDates = action.payload;
    },
    setFilteredItems: (state, action) => {
      state.filteredItems = action.payload;
    },
    setFilteredStores: (state, action) => {
      state.filteredStores = action.payload;
    },
    setItemFilter: (state, action) => {
      if (state.filterByItem.includes(action.payload)) {
        state.filterByItem.filter((item) => item !== action.payload);
      } else {
        state.filterByItem.push(action.payload);
      }
    },
    setStoreFilter: (state, action) => {
      if (state.filterByStore.includes(action.payload)) {
        state.filterByStore.filter((store) => store !== action.payload);
      } else {
        state.filterByItem.push(action.payload);
      }
    },
    resetFilterSlice: (state) =>
      (state = {
        filterDuration: 'All Time',
        filterByItem: [],
        filterByStore: [],
        filteredDates: [],
        filteredItems: [],
        filteredStores: [],
      }),
  },
});

export const {
  setFilteredStores,
  setFilteredItems,
  setFilteredDates,
  setDurationFilter,
  setItemFilter,
  setStoreFilter,
  resetFilterSlice,
} = filterSlice.actions;

export default filterSlice.reducer;
