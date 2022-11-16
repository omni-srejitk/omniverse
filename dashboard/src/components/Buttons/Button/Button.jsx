import React from 'react';

export const Button = ({ children, type, active, clickFunc }) => {
  const SECONDARY = (
    <button
      onClick={clickFunc}
      className={`cursor-pointer rounded-lg px-4 py-2 font-semibold text-gray-500 hover:bg-gray-100 ${
        active ? 'bg-gray-100 text-black' : 'bg-white'
      } hover:text-black`}
    >
      {children}
    </button>
  );

  const PRIMARY = (
    <button
      onClick={clickFunc}
      className='cursor-pointer rounded-lg bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600'
    >
      {children}
    </button>
  );

  const OUTLINED = (
    <button
      onClick={clickFunc}
      className='cursor-pointer rounded-lg border-2 border-gray-100 px-4  py-2 font-semibold text-gray-700 hover:border-gray-400  hover:text-black'
    >
      {children}
    </button>
  );

  switch (type) {
    case 'PRIMARY':
      return PRIMARY;
    case 'SECONDARY':
      return SECONDARY;
    case 'OUTLINED':
      return OUTLINED;
    default:
      return SECONDARY;
  }
};
