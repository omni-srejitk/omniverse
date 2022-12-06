import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  stores: [],
  dates: [],
  items: [],
  prices: [],
  salesData: {},
  sold: 0,
  units_sold: 0,
  sale_amount: 0,
  inventory: 0,
  warehouse: 0,
  inventoryList: [],
  warehouseList: [],
  filteredSalesData: [],
  filteredGenderAgeData: [],
  gmvSaleData: [],
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setAllStores: (state, action) => {
      state.stores = action.payload;
    },
    setAllItems: (state, action) => {
      state.items = action.payload;
    },
    setAllDates: (state, action) => {
      state.dates = action.payload;
    },
    setAllSold: (state, action) => {
      state.sold = action.payload;
    },
    setAllInventory: (state, action) => {
      state.inventory = action.payload;
    },
    setAllWarehouse: (state, action) => {
      state.warehouse = action.payload;
    },
    setAllPrices: (state, action) => {
      state.prices = action.payload;
    },
    setAllUnitsSold: (state, action) => {
      state.units_sold = action.payload;
    },
    setAllSaleAmount: (state, action) => {
      state.sale_amount = action.payload;
    },
    setAllSalesData: (state, action) => {
      state.salesData = action.payload;
    },
    setAllGMVSaleData: (state, action) => {
      state.gmvSaleData = action.payload;
    },
    setAllInventoryList: (state, action) => {
      state.inventoryList = action.payload;
    },
    setAllWarehouseList: (state, action) => {
      state.warehouseList = action.payload;
    },

    setFilteredSaleData: (state, action) => {
      state.filteredSalesData = action.payload;
    },
    setFilteredAgeGenderData: (state, action) => {
      state.filteredGenderAgeData = action.payload;
    },
    resetDataSlice: (state) =>
      (state = {
        stores: [],
        dates: [],
        items: [],
        prices: [],
        salesData: {},
        sold: 0,
        inventory: 0,
        warehouse: 0,
        filteredSalesData: [],
        filteredGenderAgeData: [],
        inventoryList: [],
        warehouseList: [],
        gmvSaleData: [],
      }),
  },
});

export const selectGenderAgeData = (state) => state.data.filteredGenderAgeData;

export const {
  setAllStores,
  setAllItems,
  setAllDates,
  setAllPrices,
  setAllSold,
  setAllSalesData,
  setAllUnitsSold,
  setAllSaleAmount,
  setFilteredAgeGenderData,
  setAllInventory,
  setAllWarehouse,
  setAllGMVSaleData,
  setAllInventoryList,
  setAllWarehouseList,
  setFilteredSaleData,
  resetDataSlice,
} = dataSlice.actions;

export default dataSlice.reducer;
