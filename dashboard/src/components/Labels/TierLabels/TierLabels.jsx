import React from 'react';
import { useState } from 'react';

export const TierLabel = ({ type = 'FLAGSHIP' }) => {
  const [showLabel, setShowLabel] = useState(false);
  const FLAGSHIP = (
    <div
      className={`max-w-40 absolute top-12 right-0 flex w-fit items-center justify-start gap-4 rounded-l-lg bg-blue-300 px-2 py-1 ${
        showLabel ? 'hidden' : 'flex'
      }`}
    >
      <div className='flex h-6 w-6 items-center justify-center rounded-full bg-blue-400'>
        <span className='material-icons flex h-4 w-4 items-center justify-center rounded-full bg-white text-sm text-blue-500'>
          bolt
        </span>
      </div>
      <p
        className={`font-semibold capitalize ${
          showLabel ? 'block' : 'hidden'
        } text-blue-600`}
      >
        FLAGSHIP
      </p>
    </div>
  );

  const PLATINUM = (
    <div className='absolute top-6 right-0 flex w-40 items-center justify-start gap-4 rounded-l-lg bg-gray-300 px-2 py-1'>
      <div className='flex h-6 w-6 items-center justify-center rounded-full bg-gray-400'>
        <span className='material-icons flex h-4 w-4 items-center justify-center rounded-full bg-white text-sm'>
          bolt
        </span>
      </div>
      <p className='font-semibold capitalize'>PLATINUM</p>
    </div>
  );

  const GOLD = (
    <div className='absolute top-6 right-0 flex w-40 items-center justify-start gap-4 rounded-l-lg bg-yellow-300 px-2 py-1'>
      <div className='flex h-6 w-6 items-center justify-center rounded-full bg-yellow-400'>
        <span className='material-icons flex h-4 w-4 items-center justify-center rounded-full bg-white text-sm text-yellow-500'>
          bolt
        </span>
      </div>
      <p className='font-semibold capitalize text-yellow-600'>GOLD</p>
    </div>
  );

  const DIAMOND = (
    <div className='max-w-40 absolute top-6 right-0 flex w-fit items-center justify-start gap-4 rounded-l-lg bg-purple-300 px-2 py-1'>
      <div className='flex h-6 w-6 items-center justify-center rounded-full bg-purple-400'>
        <span className='material-icons flex h-4 w-4 items-center justify-center rounded-full bg-white text-sm text-purple-500'>
          bolt
        </span>
      </div>
      <p className='font-semibold capitalize text-purple-600'>DIAMOND</p>
    </div>
  );

  switch (type) {
    case 'FLAGSHIP':
      return FLAGSHIP;
    case 'PLATINUM':
      return PLATINUM;
    case 'GOLD':
      return GOLD;
    case 'DIAMOND':
      return DIAMOND;
    default:
      break;
  }
};
