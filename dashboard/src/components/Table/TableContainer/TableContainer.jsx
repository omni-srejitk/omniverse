import React from 'react';

export const TableContainer = ({ children }) => {
  return (
    <table className='flex w-full overflow-hidden overflow-x-scroll flex-col items-start justify-start'>
      {children}
    </table>
  );
};
