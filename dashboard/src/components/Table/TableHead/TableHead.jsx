import React from 'react';

export const TableHead = ({ children }) => {
  return (
    <thead className='w-full border-b-2 border-gray-200'>{children}</thead>
  );
};
