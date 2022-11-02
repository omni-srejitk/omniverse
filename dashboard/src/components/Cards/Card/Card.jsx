import React from 'react';

export const Card = ({ children, title, cardHeader = null }) => {
  return (
    <div className='card'>
      <div className='card_head mb-8 flex items-center justify-between '>
        <div className='flex items-center justify-between gap-4'>
          <div className='h-8 w-4 rounded-md bg-purple-200'></div>
          <h4 className='text-3xl'>{title}</h4>
        </div>
        {cardHeader}
      </div>
      {children}
    </div>
  );
};
