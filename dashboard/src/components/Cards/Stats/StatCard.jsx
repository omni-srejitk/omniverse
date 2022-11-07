import React from 'react';

export const StatCard = ({ icon, title, metric, color, currency = false }) => {
  return (
    <div
      className={`mr-5 flex h-full min-w-[20rem] flex-col  items-start justify-start rounded-xl lg:min-w-[calc(33.33%-12px)] ${color} p-8`}
    >
      <div className='items-center flex h-12 w-12 justify-center rounded-full bg-black lg:h-12 lg:w-12'>
        <span className='material-icons  text-white'>{icon}</span>
      </div>
      <div className='mt-6'>
        <p className='text-base font-semibold'>{title}</p>
        <h3 className=' text-5xl font-semibold'>
          {' '}
          {currency && <span>&#8377;</span>}
          {metric}
        </h3>
        <div className='stock__indicator my-4 flex -items-center gap-2 rounded-full bg-red-300 p-1'>
          <span className='material-icons'>arrow_upward</span>
          37.8%
          <p className='pr-2'>this week</p>
        </div>
      </div>
    </div>
  );
};
