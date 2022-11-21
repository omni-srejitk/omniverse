import React from 'react';

export const TableData = ({ children }) => {
  return (
    <td className='flex w-full flex-grow items-center justify-start  overflow-x-scroll text-ellipsis whitespace-pre-wrap break-words px-2  font-semibold scrollbar-thin'>
      {children}
    </td>
  );
};
