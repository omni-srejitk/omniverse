import React from 'react';

export const TableBody = ({ children }) => {
  return (
    <tbody className='max-h-[30rem] w-full overflow-hidden overflow-y-scroll scrollbar-thin scrollbar-track-slate-100 scrollbar-thumb-blue-100'>
      {children}
    </tbody>
  );
};
