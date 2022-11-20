import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  stores: [],
  dates: [],
  items: [],
  prices: [],
  salesData: {},
  sold: 0,
  inventory: 0,
  warehouse: 0,
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
    setAllSalesData: (state, action) => {
      state.salesData = action.payload;
    },
    setAllGMVSaleData: (state, action) => {
      state.gmvSaleData = action.payload;
    },
  },
});

export const selectAllStores = (state) => state.data.stores;
export const selectAllItems = (state) => state.data.items;
export const selectAllDates = (state) => state.data.dates;
export const selectAllPrices = (state) => state.data.prices;
export const selectAllSalesData = (state) => state.data.salesData;
export const selectAllGMVSalesData = (state) => state.data.gmvSaleData;
export const {
  setAllStores,
  setAllItems,
  setAllDates,
  setAllPrices,
  setAllSold,
  setAllSalesData,
  setAllInventory,
  setAllWarehouse,
  setAllGMVSaleData,
} = dataSlice.actions;

export default dataSlice.reducer;
