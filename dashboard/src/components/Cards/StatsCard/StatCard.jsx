import React from 'react';
import { Spinner } from '../../Loaders';

export const StatCard = ({
  icon,
  title,
  metric = 0,
  background,
  spinner,
  loading,
  currency = false,
  tooltip,
  showLabel = false,
}) => {
  return (
    <div
      className={`relative mr-5 flex h-full min-h-[12rem] w-full min-w-[12rem] ${
        loading ? ' opacity-90' : ' opacity-100'
      } flex-col  items-start justify-start rounded-xl lg:min-w-[calc(17vw-12px)] ${background} p-8`}
    >
      {showLabel && (
        <div className='absolute top-4 right-0 rounded-l-md border-2 border-red-300 bg-white p-[2px] text-[8px] font-semibold text-red-400'>
          SOON
        </div>
      )}
      <div className='tooltip flex h-12 w-12 items-center justify-center rounded-full bg-black lg:h-12 lg:w-12'>
        <span className='material-icons  text-white'>{icon}</span>
      </div>
      <Spinner loading={loading} color={spinner} />
      <div className='mt-2'>
        <div
          className='tooltip flex w-fit items-center justify-between gap-2 hover:cursor-default'
          mytitle={tooltip}
        >
          <p className=' text-sm font-semibold'>{title}</p>
          <span className='material-icons text-base hover:cursor-pointer'>
            info
          </span>
          <span className='tooltiptext'>{tooltip}</span>
        </div>
        <h3 className=' text-4xl font-semibold'>
          {' '}
          {currency && <span>&#8377;</span>}
          {metric > 1000 ? (metric / 1000).toFixed(1) + 'K' : metric}
        </h3>
      </div>
    </div>
  );
};
