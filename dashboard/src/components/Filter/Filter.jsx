import React, { useState } from 'react';
import { useFilter } from '../../context/FilterContext/FilterContext';

export const Filter = ({ filter, showState, setShowState }) => {
  const [itemFilters, setItemFilters] = useState([]);
  const [storeFilters, setStoreFilters] = useState([]);
  const { filterState, filterDispatch } = useFilter();

  const handleItemChange = (val) => {
    if (itemFilters?.includes(val)) {
      setItemFilters(itemFilters.filter((filter) => filter !== val));
    } else {
      setItemFilters((prevState) => [...prevState, val]);
    }
  };

  const handleStoreChange = (val) => {
    if (storeFilters?.includes(val)) {
      setStoreFilters(storeFilters.filter((filter) => filter !== val));
    } else {
      setStoreFilters((prevState) => [...prevState, val]);
    }
  };
  return (
    <div className=' relative w-max '>
      <div
        onClick={() =>
          setShowState({
            ...showState,
            durationFilter: false,
            productFilter: !showState.productFilter,
          })
        }
        className='flex cursor-pointer items-center justify-between rounded-2xl  border-2 border-gray-100 px-4 py-2 font-medium hover:border-gray-400'
      >
        <span className='material-icons'>
          {showState.productFilter ? 'close' : 'filter_alt'}
        </span>
      </div>
      <div
        className={`absolute -right-6 z-20 rounded-xl bg-white p-6 md:right-0 ${
          showState.productFilter ? 'visible h-fit' : 'hidden h-0'
        } shadow-md`}
      >
        <p className='my-2 font-medium text-gray-500'>By Product</p>
        <div className='max-h-[15rem] overflow-y-auto pr-4 scrollbar-thin scrollbar-track-gray-50 scrollbar-thumb-blue-100 scrollbar-track-rounded-lg'>
          {filter['By Product']?.map((filterBy) => (
            <div key={filterBy}>
              <div className=' my-2 max-h-[15rem] overflow-y-auto'>
                <div
                  key={filterBy}
                  className='mb-3 flex w-80 items-start justify-between '
                >
                  <label className='font-semibold' htmlFor={filterBy}>
                    {filterBy}
                  </label>
                  <input
                    type={'checkbox'}
                    id={filterBy}
                    onChange={(e) => handleItemChange(e.target.dataset.value)}
                    checked={
                      filterState.filterBy?.includes(filterBy) ||
                      itemFilters.includes(filterBy)
                    }
                    data-value={filterBy}
                    className=' h-6 w-6 cursor-pointer font-semibold text-gray-500 hover:text-black'
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='divider h-[2px] w-full bg-gray-100'></div>
        <p className='my-2 font-medium text-gray-500'>By Store</p>
        <div className='mb-8 max-h-[15rem] overflow-y-auto pr-4 scrollbar-thin scrollbar-track-gray-50 scrollbar-thumb-blue-100 scrollbar-track-rounded-lg'>
          {filter['By Store']?.map((filterByStore) => (
            <div key={filterByStore}>
              <div className=' my-2'>
                <div
                  key={filterByStore}
                  className='mb-3 flex w-80 items-start justify-between '
                >
                  <label className='font-semibold' htmlFor={filterByStore}>
                    {filterByStore}
                  </label>
                  <input
                    type={'checkbox'}
                    id={filterByStore}
                    onChange={(e) => handleStoreChange(e.target.dataset.value)}
                    checked={
                      filterState.filterBy?.includes(filterByStore) ||
                      storeFilters.includes(filterByStore)
                    }
                    data-value={filterByStore}
                    className=' h-6 w-6 cursor-pointer font-semibold text-gray-500 hover:text-black'
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='mw-full flex items-center gap-4'>
          <button
            onClick={() => {
              filterDispatch({
                type: 'SET_FILTERED_STORES',
                payload: filterState.STORES,
              });
              filterDispatch({
                type: 'SET_FILTERED_ITEMS',
                payload: filterState.ITEMS,
              });
              filterDispatch({
                type: 'SET_FILTERS',
                payload: [],
              });
              setItemFilters([]);
              setStoreFilters([]);
              setShowState({ ...showState, productFilter: false });
            }}
            className='ml-auto flex cursor-pointer items-center  justify-between  rounded-2xl border-2 border-gray-100 px-4 py-2 font-medium hover:border-gray-400'
          >
            Reset
          </button>
          <button
            onClick={() => {
              filterDispatch({
                type: 'SET_FILTERS',
                payload: [...itemFilters, ...storeFilters],
              });
              filterDispatch({
                type: 'SET_FILTERED_STORES',
                payload:
                  storeFilters?.length === 0
                    ? filterState.STORES
                    : storeFilters,
              });
              filterDispatch({
                type: 'SET_FILTERED_ITEMS',
                payload:
                  itemFilters?.length === 0 ? filterState.ITEMS : itemFilters,
              });
              setShowState({ ...showState, productFilter: false });
            }}
            className='border-gray- 100 flex cursor-pointer  items-center  justify-between rounded-2xl border-2 bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-600'
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};
