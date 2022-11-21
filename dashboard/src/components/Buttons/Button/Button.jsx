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
      className='cursor-pointer rounded-lg border-2 border-gray-300 px-4  py-2 font-semibold text-gray-700 hover:border-gray-400  hover:text-black'
    >
      {children}
    </button>
  );

  const LOGO_BUTTON = (
    <button
      onClick={clickFunc}
      className='group absolute top-4 right-4 z-40 h-10 w-10 cursor-pointer rounded-lg border-2 border-gray-100 bg-white font-semibold text-gray-700 hover:border-gray-400  hover:text-black'
    >
      <span className='material-icons flex h-full w-full items-center justify-center rounded-lg text-gray-400 group-hover:text-black'>
        {children}
      </span>
    </button>
  );

  switch (type) {
    case 'PRIMARY':
      return PRIMARY;
    case 'SECONDARY':
      return SECONDARY;
    case 'OUTLINED':
      return OUTLINED;
    case 'LOGO_BUTTON':
      return LOGO_BUTTON;
    default:
      return SECONDARY;
  }
};
