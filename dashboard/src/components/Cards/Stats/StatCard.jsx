import React from 'react';

export const StatCard = ({ icon, title, metric, color }) => {
  return (
    <div
      className={`mr-5 flex w-[25rem] flex-col items-start justify-start rounded-xl ${color} p-8`}
    >
      <div className='items-center flex h-20 w-20 justify-center rounded-full bg-black'>
        <span className='material-icons  text-white'>{icon}</span>
      </div>
      <div className='mt-8'>
        <p className='text-base font-semibold'>{title}</p>
        <h3 className=' text-5xl font-semibold'>{metric}</h3>
        <div className='stock__indicator my-4 flex -items-center gap-2 rounded-full bg-red-300 p-1'>
          <span className='material-icons'>arrow_upward</span>
          37.8%
          <p className='pr-2'>this week</p>
        </div>
      </div>
    </div>
  );
};
