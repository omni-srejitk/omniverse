import React from 'react';

export const TableContainer = ({ children }) => {
  return (
    <table className='flex h-full w-full flex-col items-start justify-start overflow-hidden overflow-x-scroll pb-10 scrollbar-thin'>
      {children}
    </table>
  );
};
