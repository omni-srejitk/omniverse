import React from 'react';

export const TableRow = ({ children }) => {
  return (
    <tr className='flex w-full items-center  justify-evenly  py-3 capitalize odd:bg-white even:bg-gray-100'>
      {children}
    </tr>
  );
};
