import React from 'react';

export const ComingSoon = (props) => {
  const { logo, title, subtitle } = props;
  return (
    <div className='flex h-full w-full items-center justify-center'>
      <div className='flex flex-col items-center justify-center gap-4'>
        <span className='material-icons flex h-20 w-20 items-center justify-center rounded-full bg-gray-200 text-4xl text-gray-400'>
          {logo}
        </span>
        <p className=' text-center text-xl'>{title}</p>
        <p className=' text-center font-semibold text-gray-500'>{subtitle}</p>
      </div>
    </div>
  );
};
