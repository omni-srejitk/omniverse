import React from 'react';
import { useState } from 'react';

export const Select = ({ duration, setDuration }) => {
  const [showState, setShowState] = useState(false);

  return (
    <div className='relative w-max '>
      <div
        onClick={() => setShowState((prevState) => !prevState)}
        className='items-center border-gray- 100 flex cursor-pointer justify-between  rounded-2xl border-2 px-4 py-2 font-medium hover:border-gray-400'
      >
        {duration}
        <span className='material-icons'>
          {showState ? 'expand_less' : 'expand_more'}
        </span>
      </div>
      <ul
        className={` ${
          !showState ? 'invisible h-0' : 'h-fit'
        } items-center fixed z-20 my-1 flex flex-col justify-start rounded-xl border-2 border-gray-50 bg-white `}
      >
        <li
          onClick={(e) => {
            setDuration(e.target.dataset.value);
            setShowState(false);
          }}
          data-value='This Week'
          className=' cursor-pointer px-4 py-2 font-semibold text-gray-500 hover:text-black'
        >
          This Week
        </li>
        <li
          onClick={(e) => {
            setDuration(e.target.dataset.value);
            setShowState(false);
          }}
          data-value='This Month'
          className=' cursor-pointer px-4 py-2 font-semibold text-gray-500 hover:text-black'
        >
          This Month
        </li>
        <li
          onClick={(e) => {
            setDuration(e.target.dataset.value);
            setShowState(false);
          }}
          data-value='All Time'
          className=' cursor-pointer px-4 py-2 font-semibold text-gray-500 hover:text-black'
        >
          All Time
        </li>
      </ul>
    </div>
  );
};
