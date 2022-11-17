import React from 'react';

export const TableData = ({ children }) => {
  return (
    <td className='flex w-full flex-grow items-center justify-start  text-ellipsis whitespace-pre-wrap break-words  px-2 font-semibold'>
      {children}
    </td>
  );
};
