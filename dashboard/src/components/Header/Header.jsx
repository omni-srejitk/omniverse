import React from 'react';
import { MdPerson } from 'react-icons/md';

export const Header = () => {
  return (
    <header className=' fixed top-0 z-10 flex h-20 w-screen items-center justify-between bg-blue-500 px-6'>
      <h1 className='pl-20 text-2xl font-medium uppercase text-white'>
        Omniverse
      </h1>
      <div className='flex h-10 w-10 cursor-pointer items-center justify-center rounded-full  hover:bg-white/20'>
        <MdPerson className='fill-white' />
      </div>
    </header>
  );
};
