import { useQuery } from '@tanstack/react-query';
import React, { useMemo } from 'react';
import { useReducer } from 'react';
import { useContext } from 'react';
import { createContext } from 'react';
import axios from '../../axios';
import { computeSalesNumber, prepareData } from '../../utils/helperFunctions';
import { getFilteredData } from './FilterCompose';
import { filterReducer } from './FilterReducer';

const FilterContext = createContext();

const useFilter = () => useContext(FilterContext);

const FilterProvider = ({ children }) => {
  const [filterState, filterDispatch] = useReducer(filterReducer, {
    filterByDate: 'All Time',
    filterBy: [],
    database: [],
    ISLOGGED: false,
    DATES: [],
    ITEMS: [],
    STORES: [],
    FILTERED_DATES: [],
    FILTERED_ITEMS: [],
    FILTERED_STORES: [],
    BRAND: 'BeyondWater',
  });

  const { isLoading: isGMVDataLoading, data: gmvSaleRes } = useQuery(
    ['gmv_sale_data'],
    () => {
      return axios.get(
        `${import.meta.env.VITE_BASE_URL}` +
          `.gmv_sales_date_wise?brand=${encodeURI(filterState.BRAND)}`
      );
    }
  );

  const GMV_SALES_DATA = !isGMVDataLoading && gmvSaleRes?.data['message'];

  var { items, stores, dates, prices, sale_count } = useMemo(
    () => prepareData(GMV_SALES_DATA, filterDispatch),
    [GMV_SALES_DATA]
  );

  const { cumlativeSalesReport, checkThis } = useMemo(
    () =>
      computeSalesNumber(
        filterState.FILTERED_DATES,
        filterState.FILTERED_STORES,
        filterState.FILTERED_ITEMS,
        prices,
        GMV_SALES_DATA,
        sale_count
      ),
    [
      filterState.FILTERED_DATES,
      filterState.FILTERED_STORES,
      filterState.FILTERED_ITEMS,
      prices,
      GMV_SALES_DATA,
      sale_count,
    ]
  );

  const datalist = getFilteredData(filterState, cumlativeSalesReport.SALE_DATA);

  return (
    <FilterContext.Provider
      value={{
        filterState,
        datalist,
        items,
        stores,
        dates,
        checkThis,
        isGMVDataLoading,
        cumlativeSalesReport,
        filterDispatch,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export { useFilter, FilterProvider };
