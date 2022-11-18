import React from 'react';

export const TableRow = ({ children }) => {
  return (
    <tr className='flex h-full w-full items-center justify-start overflow-hidden overflow-x-scroll  py-3  capitalize scrollbar-thin odd:bg-white even:bg-gray-100'>
      {children}
    </tr>
  );
};
