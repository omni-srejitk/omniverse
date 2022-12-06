import React from 'react';
import { ProgressBar } from '../../Loaders';

export const GenderChart = ({ data = {} }) => {
  const MALE_PERC = Math.round((+data.Male * 100) / +data.All);
  const FEMALE_PERC = Math.round((+data.Female * 100) / +data.All);

  return (
    <div className='flex h-full w-full items-center justify-between gap-8'>
      <div className='relative flex h-full flex-grow flex-col items-center justify-start'>
        <div className='relative h-full w-full '>
          <span className='material-icons flex h-full w-full items-center justify-center text-[15rem] text-green-500'>
            man
          </span>
        </div>
        <ProgressBar label='Male' value={MALE_PERC} />
      </div>
      <div className='relative flex h-full flex-grow flex-col items-center justify-start'>
        <div className='relative h-full w-full '>
          <span className='material-icons flex h-full w-full items-center justify-center text-[15rem] text-red-500'>
            woman
          </span>
        </div>
        <ProgressBar label='Female' value={FEMALE_PERC} />
      </div>
    </div>
  );
};
