import React, { useState } from 'react';

export const Filter = ({ filter, setFilter }) => {
  const [showState, setShowState] = useState(false);
  return (
    <div className=' relative w-max '>
      <div
        onClick={() => setShowState((prevState) => !prevState)}
        className='items-center border-gray- 100 flex cursor-pointer justify-between  rounded-2xl border-2 px-4 py-2 font-medium hover:border-gray-400'
      >
        <span className='material-icons'>
          {showState ? 'close' : 'filter_alt'}
        </span>
      </div>
      <div
        className={`absolute right-0 z-20 rounded-xl bg-white p-6 ${
          showState ? 'visible h-fit' : 'hidden h-0'
        } shadow-md`}
      >
        <p className='my-2 font-medium text-gray-500'>Sort by SKU</p>
        <div className='mb-3 flex w-80 items-start  justify-between'>
          <label className='font-semibold' for='SKU'>
            Tangelo Orange
          </label>
          <input
            type={'checkbox'}
            id='SKU'
            onClick={(e) => {
              setFilter(e.target.dataset.value);
            }}
            data-value='Tangelo Orange'
            className=' h-6 w-6 cursor-pointer font-semibold text-gray-500 hover:text-black'
          />
        </div>
        <div className='mb-3 flex w-80 items-start  justify-between'>
          <label className='font-semibold' for='SKU'>
            Tarty Lemon
          </label>
          <input
            type={'checkbox'}
            id='SKU_2'
            onClick={(e) => {
              setFilter(e.target.dataset.value);
            }}
            data-value='Tarty Lemon'
            className=' h-6 w-6 cursor-pointer font-semibold text-gray-500 hover:text-black'
          />
        </div>
        <div className='mb-3 flex w-80 items-start justify-between '>
          <label className='font-semibold' for='SKU'>
            Very Strawberry
          </label>
          <input
            type={'checkbox'}
            id='SKU_3'
            onClick={(e) => {
              setFilter(e.target.dataset.value);
            }}
            data-value='Very Strawberry'
            className=' h-6 w-6 cursor-pointer font-semibold text-gray-500 hover:text-black'
          />
        </div>
        <div className='items-center mw-full flex gap-4'>
          <button
            onClick={() => setShowState(false)}
            className='items-center border-gray- 100 ml-auto flex  cursor-pointer  justify-between rounded-2xl border-2 px-4 py-2 font-medium hover:border-gray-400'
          >
            Reset
          </button>
          <button
            onClick={() => setShowState(false)}
            className='items-center border-gray- 100 flex  cursor-pointer  justify-between rounded-2xl border-2 bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-600'
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};
