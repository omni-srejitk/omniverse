import React from 'react';

export const PercentageChange = (props) => {
  const { PERC_SALE = 0, FIRSTDATE } = props;
  return (
    <div className='my-2 mb-4  flex items-center gap-2'>
      <div className='flex w-fit items-center justify-center gap-1 rounded-xl bg-green-200 p-1'>
        <span className='material-icons m-0 p-0 text-sm'>
          {PERC_SALE > 0 ? 'arrow_upwards' : 'arrow_downwards'}
        </span>
        <p className='pr-2 text-sm font-medium'>{PERC_SALE || 0}%</p>
      </div>
      <p className='font-medium text-gray-400'>vs {FIRSTDATE}</p>
    </div>
  );
};
