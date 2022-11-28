import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectItemFilters, selectStoreFilters } from '../../redux/actions';
import {
  setFilteredItems,
  setFilteredStores,
} from '../../redux/features/filterSlice';
import { fetchAllLiveStores } from '../../services/apiCalls';
import { Spinner } from '../Loaders';

export const Filter = ({ filter, showState, setShowState }) => {
  const [itemFilters, setItemFilters] = useState([]);
  const [storeFilters, setStoreFilters] = useState([]);
  const BRAND = localStorage.getItem('Name');
  const dispatch = useDispatch();
  const FILTERBYITEM = useSelector(selectItemFilters);
  const FILTERBYSTORE = useSelector(selectStoreFilters);
  const { data: liveStoreData, isloading: isStoresLoading } =
    fetchAllLiveStores(BRAND);

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
              <div className=' my-2 flex max-h-[15rem] items-center justify-between overflow-y-auto'>
                <div className='mb-3 flex h-full w-80 items-start justify-between '>
                  <label className='w-[90%] font-semibold' htmlFor={filterBy}>
                    {filterBy}
                  </label>
                  <input
                    type={'checkbox'}
                    id={filterBy}
                    onChange={(e) => handleItemChange(e.target.dataset.value)}
                    checked={
                      FILTERBYITEM?.includes(filterBy) ||
                      itemFilters.includes(filterBy)
                    }
                    data-value={filterBy}
                    className=' h-6 w-6 cursor-pointer rounded-lg font-semibold text-gray-500  hover:text-black'
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='divider h-[2px] w-full bg-gray-100'></div>
        <p className='my-2 font-medium text-gray-500'>By Store</p>
        <div className='mb-8 max-h-[15rem] overflow-y-auto pr-4 scrollbar-thin scrollbar-track-gray-50 scrollbar-thumb-blue-100 scrollbar-track-rounded-lg'>
          {isStoresLoading ? (
            <div className='relative h-full w-full'>
              <Spinner loading={isStoresLoading} />
            </div>
          ) : (
            liveStoreData?.map((filterByStore) => (
              <div key={filterByStore.customer}>
                <div className=' my-2'>
                  <div className='mb-3 flex w-80 items-start justify-between '>
                    <label
                      className='font-semibold'
                      htmlFor={filterByStore.customer}
                    >
                      {filterByStore.customer_name}
                    </label>
                    <input
                      type={'checkbox'}
                      id={filterByStore.customer}
                      onChange={(e) =>
                        handleStoreChange(e.target.dataset.value)
                      }
                      checked={
                        FILTERBYSTORE?.includes(filterByStore.customer) ||
                        storeFilters.includes(filterByStore.customer)
                      }
                      data-value={filterByStore.customer}
                      className=' h-6 w-6 cursor-pointer font-semibold text-gray-500 hover:text-black'
                    />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className='mw-full flex items-center gap-4'>
          <button
            onClick={() => {
              dispatch(setFilteredStores([]));
              dispatch(setFilteredItems([]));
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
              const FILTER_BY_STORES =
                storeFilters?.length === 0 ? [] : storeFilters;
              const FILTER_BY_ITEMS =
                itemFilters?.length === 0 ? [] : itemFilters;
              dispatch(setFilteredStores(FILTER_BY_STORES));
              dispatch(setFilteredItems(FILTER_BY_ITEMS));
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
