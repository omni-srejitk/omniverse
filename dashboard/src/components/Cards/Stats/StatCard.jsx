import React from 'react';
import { Spinner } from '../../Loaders/Spinner/Spinner';

export const StatCard = ({
  icon,
  title,
  metric = 0,
  background,
  spinner,
  loading,
  currency = false,
  tooltip,
}) => {
  return (
    <div
      className={`relative mr-5 flex h-full min-h-[12rem] min-w-[12rem] w-full ${
        loading ? ' opacity-90' : ' opacity-100'
      } flex-col  items-start justify-start rounded-xl lg:min-w-[calc(17vw-12px)] ${background} p-8`}
    >
      <div className='flex h-12 w-12 items-center justify-center rounded-full bg-black lg:h-12 lg:w-12'>
        <span className='material-icons  text-white'>{icon}</span>
      </div>
      <Spinner loading={loading} color={spinner} />
      <div className='mt-2'>
        <div className='flex w-fit items-center justify-between gap-2'>
          <p className='text-sm font-semibold'>{title}</p>
          <span title={tooltip} className='material-icons text-base'>
            info
          </span>
        </div>
        <h3 className=' text-5xl font-semibold'>
          {' '}
          {currency && <span>&#8377;</span>}
          {metric}
        </h3>
      </div>
    </div>
  );
};
