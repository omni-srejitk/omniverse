import React from 'react';

export const ProgressBar = ({ label, value }) => {
  const calculateBarColors = (value) => {
    if (value > 75 && value <= 100) {
      return '#16a34a';
    } else if (value > 50 && value <= 75) {
      return '#ea580c';
    } else if (value > 25 && value <= 50) {
      return '#ca8a04';
    } else if (value <= 25) {
      return '#dc2626';
    }
  };

  const calculateTextColors = (value) => {
    if (value >= 75 && value <= 100) {
      return '#16a34a';
    } else if (value >= 50 && value < 75) {
      return '#ea580c';
    } else if (value > 25 && value < 50) {
      return '#ca8a04';
    } else if (value <= 25) {
      return '#dc2626';
    }
  };

  let COLOR = calculateBarColors(value);
  let TEXT_COLOR = calculateTextColors(value);

  return (
    <div className='h-fit w-full'>
      <div className='mb-1 flex w-full justify-between'>
        <span
          className={`text-base font-medium dark:text-white`}
          style={{ color: TEXT_COLOR }}
        >
          {label}
        </span>
        <span
          className={`text-sm font-medium dark:text-white`}
          style={{ color: TEXT_COLOR }}
        >
          {value}%
        </span>
      </div>
      <div className='h-2.5 w-full rounded-full bg-gray-200'>
        <div
          style={{ width: value + '%', background: COLOR }}
          className={`h-2.5 rounded-full`}
        ></div>
      </div>
    </div>
  );
};
