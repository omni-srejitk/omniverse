import React from 'react';

export const Card = ({ children, title, cardHeader = null, classes }) => {
  return (
    <div className={`card ${classes}`}>
      <div className='card_head mb-4 flex items-center justify-between '>
        <div className='flex items-center justify-between gap-4'>
          <div className='h-8 w-4 rounded-md bg-purple-200'></div>
          <h4 className=' pr-4 text-lg md:text-3xl'>{title}</h4>
        </div>
        {cardHeader}
      </div>
      {children}
    </div>
  );
};
