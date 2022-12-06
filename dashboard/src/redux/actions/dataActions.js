export const selectAllStores = (state) => state.data.stores;
export const selectAllItems = (state) => state.data.items;
export const selectAllDates = (state) => state.data.dates;
export const selectAllPrices = (state) => state.data.prices;
export const selectAllSalesData = (state) => state.data.salesData;
export const selectAllGMVSalesData = (state) => state.data.gmvSaleData;
export const selectInventoryList = (state) => state.data.inventoryList;
export const selectAllInventory = (state) => state.data.inventory;
export const selectWarehouseList = (state) => state.data.warehouseList;
export const selectAllWarehouse = (state) => state.data.warehouse;
export const selectUnitsSold = (state) => state.data.units_sold;
export const selectSaleAmount = (state) => state.data.sale_amount;
export const selectFilteredSalesData = (state) => state.data.filteredSalesData;
export const selectFilteredAgeGenderData = (state) =>
  state.data.filteredGenderAgeData;
