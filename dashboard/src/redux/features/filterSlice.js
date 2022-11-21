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
  },
});

export const selectAllFilteredStores = (state) => state.filter.filteredStores;

export const selectAllFilteredItems = (state) => state.filter.filteredItems;

export const selectAllFilteredDates = (state) => state.filter.filteredDates;

export const selectDurationFilter = (state) => state.filter.filterDuration;

export const selectItemFilters = (state) => state.filter.filterByItem;

export const selectStoreFilters = (state) => state.filter.filterByStore;

export const {
  setFilteredStores,
  setFilteredItems,
  setFilteredDates,
  setDurationFilter,
  setItemFilter,
  setStoreFilter,
} = filterSlice.actions;

export default filterSlice.reducer;
