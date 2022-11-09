import React from 'react';
import { MdPerson } from 'react-icons/md';

export const Header = () => {
  return (
    <header className=' fixed top-0 z-30 flex h-20 w-screen items-center justify-between bg-white px-6 shadow-sm lg:w-[100vw-20rem]'>
      <h1 className='pl-20 text-2xl font-semibold uppercase text-blue-700 lg:pl-80'>
        Omniverse
      </h1>
      <div className='flex h-10 w-10 cursor-pointer items-center justify-center rounded-full  hover:bg-white/20'>
        <MdPerson className='fill-white' />
      </div>
    </header>
  );
};
