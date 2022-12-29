import React from 'react';

export const ProgressBar = ({ label, value }) => {
  const calculateBarColors = (value) => {
    if (value > 75 && value <= 100) {
      return '#16a34a';
    } else if (value > 50 && value <= 75) {
      return '#fb923c';
    } else if (value > 25 && value <= 50) {
      return '#fbbf24';
    } else if (value <= 25) {
      return '#dc2626';
    }
  };

  const calculateTextColors = (value) => {
    if (value >= 75 && value <= 100) {
      return '#16a34a';
    } else if (value >= 50 && value < 75) {
      return '#fb923c';
    } else if (value > 25 && value < 50) {
      return '#fbbf24';
    } else if (value <= 25) {
      return '#dc2626';
    }
  };

  let COLOR = calculateBarColors(value);
  let TEXT_COLOR = calculateTextColors(value);

  return (
    <div className='-ml-3 h-fit w-24'>
      <div className='mb-1 flex w-full items-center justify-between gap-2'>
        <span className={`text-base font-medium text-black`}>{label}</span>
        <span
          className={`text-sm font-medium dark:text-white`}
          style={{ color: TEXT_COLOR }}
        >
          {value}%
        </span>
      </div>

      <div className='h-2.5 w-full rounded-full bg-gray-200 transition-[width]'>
        <div
          style={{ width: value + '%', background: COLOR }}
          className={`h-2.5 w-0 rounded-full`}
        ></div>
      </div>
    </div>
  );
};
