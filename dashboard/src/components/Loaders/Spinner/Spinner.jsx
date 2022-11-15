import React from 'react';

export const Spinner = ({ loading, color, position = 'top-6 right-6' }) => {
  const spinner = (
    <div
      className={`absolute ${position}  h-5 w-5 animate-spin rounded-full border-4 ${color} border-t-transparent`}
    ></div>
  );
  return loading && spinner;
};
