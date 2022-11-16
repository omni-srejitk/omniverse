import React from 'react';

export const TableHeader = ({ children }) => {
  return (
    <th className='flex w-full flex-grow items-start whitespace-pre-wrap break-words px-2 py-3 text-sm text-gray-700'>
      {children}
    </th>
  );
};
