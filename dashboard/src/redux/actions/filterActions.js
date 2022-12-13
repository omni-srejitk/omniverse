export const selectAllFilteredStores = (state) => state.filter.filteredStores;

export const selectAllFilteredItems = (state) => state.filter.filteredItems;

export const selectAllFilteredDates = (state) => state.filter.filteredDates;

export const selectDurationFilter = (state) => state.filter.filterDuration;

export const selectItemFilters = (state) => state.filter.filterByItem;

export const selectStoreFilters = (state) => state.filter.filterByStore;

export const selectFilterStartDate = (state) => state.filter.filterStartDate;

export const selectFilterEndDate = (state) => state.filter.filterEndDate;
