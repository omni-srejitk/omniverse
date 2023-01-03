import React from 'react';

export const Card = ({
  children,
  title,
  cardHeader = null,
  classes,
  info = '',
}) => {
  return (
    <div className={`card ${classes}`}>
      <div className='card_head mb-4 flex items-center justify-between '>
        <div className='flex items-center justify-start'>
          <div className='mr-4 h-8 w-4 rounded-md bg-purple-200'></div>
          <h4 className=' pr-4 text-lg md:text-3xl'>{title}</h4>
          {/* //TODO To be added in Next PR */}
          {info.length > 0 ? (
            <div className='tooltip'>
              <h1
                // title={info}
                className='material-icons cursor-default text-sm text-black/70'
              >
                info
              </h1>
              <span className='tooltiptextforcard bottom-0 z-10'>{info}</span>
            </div>
          ) : (
            <h1
              title={info}
              className='material-icons text-sm text-black/70'
            ></h1>
          )}
        </div>
        {cardHeader}
      </div>
      {children}
    </div>
  );
};
