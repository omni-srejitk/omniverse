import React from 'react';

export const TableContainer = ({ children }) => {
  return (
    <table className='flex w-full flex-col items-start justify-start'>
      {children}
    </table>
  );
};
