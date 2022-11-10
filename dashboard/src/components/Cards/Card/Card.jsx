import React from 'react';

export const Card = ({ children, title, cardHeader = null, classes }) => {
  return (
    <div className={`card ${classes}`}>
      <div className='card_head items-center mb-8 flex justify-between '>
        <div className='items-center flex justify-between gap-4'>
          <div className='h-8 w-4 rounded-md bg-purple-200'></div>
          <h4 className=' pr-4 text-lg md:text-3xl'>{title}</h4>
        </div>
        {cardHeader}
      </div>
      {children}
    </div>
  );
};
