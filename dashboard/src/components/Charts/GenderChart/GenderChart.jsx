import React from 'react';
import { ProgressBar } from '../../Loaders';

export const GenderChart = ({ data = {} }) => {
  const MALE_PERC = Math.round((+data.Male * 100) / +data.All);
  const FEMALE_PERC = Math.round((+data.Female * 100) / +data.All);

  const GENDER_RATIO_CHART = ({ type }) => {
    return (
      <div className=' flex h-full flex-grow flex-col items-center justify-center gap-4'>
        <div className=' flex w-full items-center'>
          <span
            className={`material-icons flex w-full items-center justify-center text-9xl ${
              type === 'MALE' ? 'text-green-400/70' : 'text-blue-400/70'
            }`}
          >
            {type === 'MALE' ? 'male' : 'female'}
          </span>
        </div>
        <ProgressBar
          label={type === 'MALE' ? 'Male' : 'Female'}
          value={type === 'MALE' ? MALE_PERC : FEMALE_PERC}
        />
      </div>
    );
  };

  return (
    <div className='flex h-full w-full items-center justify-between gap-8'>
      <GENDER_RATIO_CHART type='MALE' />
      <GENDER_RATIO_CHART type='FEMALE' />
    </div>
  );
};
