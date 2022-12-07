import React from 'react';
import { ProgressBar } from '../../Loaders';

export const GenderChart = ({ data = {} }) => {
  const MALE_PERC = Math.round((+data.Male * 100) / +data.All);
  const FEMALE_PERC = Math.round((+data.Female * 100) / +data.All);

  return (
    <div className='flex h-full w-full items-center justify-between gap-8'>
      <div className=' flex h-full flex-grow flex-col items-start justify-start'>
        <div className=' flex h-full w-full items-center'>
          <span className='material-icons flex w-full items-center justify-center text-7xl text-green-400'>
            man
          </span>
        </div>
        <ProgressBar label='Male' value={MALE_PERC} />
      </div>
      <div className=' flex h-full flex-grow flex-col items-start justify-start'>
        <div className=' flex h-full w-full items-center'>
          <span className='material-icons flex w-full items-center justify-center text-7xl text-red-400'>
            woman
          </span>
        </div>
        <ProgressBar label='Female' value={FEMALE_PERC} />
      </div>
    </div>
  );
};
