import React, { useState, useContext, createContext } from 'react';
import { useReducer } from 'react';
import { filterReducer } from './FilterReducer';

const FilterContext = createContext();

const useFilter = () => useContext(FilterContext);

const FilterProvider = ({ children }) => {
  const [filterState, filterDispatch] = useReducer(filterReducer, {
    filterByDate: 'All Time',
    filterBy: [],
    ISLOGGED: false,
    DATES: [],
    ITEMS: [],
    STORES: [],
    FILTERED_DATES: [],
    FILTERED_ITEMS: [],
    FILTERED_STORES: [],
    BRAND: '',
  });

  return (
    <FilterContext.Provider
      value={{
        filterState,
        filterDispatch,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export { useFilter, FilterProvider };
