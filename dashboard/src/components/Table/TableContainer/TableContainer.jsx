import React from 'react';

export const TableContainer = ({ children }) => {
  return (
    <table className='flex w-full flex-col items-start justify-start overflow-hidden overflow-x-scroll scrollbar-thin'>
      {children}
    </table>
  );
};
