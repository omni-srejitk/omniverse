import React, { useState } from 'react';
import { MdPerson } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useFilter } from '../../context/FilterContext/FilterContext';

export const Header = () => {
  const [profileOption, setProfileOption] = useState(false);
  const { filterDispatch } = useFilter();
  const navigate = useNavigate();

  const Logout = () => {
    filterDispatch({ type: 'LOGOUT' });
    navigate('/');
    localStorage.remove('Brand');
  };
  return (
    <header className=' items-center fixed  top-0 right-0 z-30 flex h-20 w-[calc(100vw-6rem)] justify-between bg-white px-6 pr-10 shadow-sm lg:w-[calc(100vw-20rem)]'>
      <h1 className='pl-6 text-2xl font-semibold lowercase text-[#3498db]'>
        Omniverse
      </h1>
      <button
        onClick={() => setProfileOption((Prev) => !Prev)}
        className={`items-center relative flex h-10 w-10 cursor-pointer justify-center rounded-full border-2 ${
          profileOption
            ? 'border-gray-300 bg-gray-200/50 hover:bg-gray-300'
            : 'border-gray-200 bg-white hover:bg-gray-50'
        }   `}
      >
        <MdPerson className='pointer-events-none fill-black' />
        {profileOption && (
          <div className='absolute top-16 -right-4 flex h-fit w-full min-w-[10rem] flex-col justify-between overflow-hidden rounded-xl border-2 border-gray-300 bg-gray-50 shadow-sm'>
            <button
              onClick={Logout}
              className='items-center flex h-fit w-full min-w-[10rem] justify-between gap-0 p-1 px-4 text-gray-400 hover:bg-gray-100 hover:text-black hover:shadow-sm'
            >
              <span className='material-icons text-3xl'>logout</span>
              <p className=' font-medium'>Logout</p>
            </button>
          </div>
        )}
      </button>
    </header>
  );
};
