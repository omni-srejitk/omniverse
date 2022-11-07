import React from 'react';
import { useState } from 'react';
import { useFilter } from '../../context/StoreContext/FilterContext';
import { DATE_FILTERS } from '../../utils/constants';

export const Select = () => {
  const [showState, setShowState] = useState(false);
  const { filterState, filterDispatch } = useFilter();

  return (
    <div className='relative w-max '>
      <div
        onClick={() => setShowState((prevState) => !prevState)}
        className='border-gray- 100 flex cursor-pointer items-center justify-between  rounded-2xl border-2 px-4 py-2 font-medium hover:border-gray-400'
      >
        {filterState.filterByDate}
        <span className='material-icons'>
          {showState ? 'expand_less' : 'expand_more'}
        </span>
      </div>
      <ul
        className={` ${
          !showState ? 'invisible h-0' : 'h-fit'
        } fixed z-20 my-1 flex flex-col items-center justify-start rounded-xl border-2 border-gray-50 bg-white `}
      >
        {DATE_FILTERS.map((item) => (
          <li
            key={item.id}
            onClick={(e) => {
              filterDispatch({
                type: 'SET_DATE_FILTER',
                payload: item.title,
              });
              setShowState(false);
            }}
            className=' cursor-pointer px-4 py-2 font-semibold text-gray-500 hover:text-black'
          >
            {item.title}
          </li>
        ))}
      </ul>
    </div>
  );
};
