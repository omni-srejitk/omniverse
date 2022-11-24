import React, { useState } from 'react';
import { MdPerson } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetAuthSlice } from '../../redux/features/authSlice';
import { Button } from '../Buttons';
import { resetDataSlice } from '../../redux/features/dataSlice';
import { resetFilterSlice } from '../../redux/features/filterSlice';

export const Header = () => {
  const [profileOption, setProfileOption] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const Logout = () => {
    dispatch(resetAuthSlice());
    dispatch(resetDataSlice());
    dispatch(resetFilterSlice());
    navigate('/');
    localStorage.clear();
  };
  return (
    <header className=' fixed top-0  z-30 mx-auto flex h-20 w-screen items-center justify-between bg-white px-6 shadow-sm md:right-0 md:w-[calc(100vw-6rem)] md:pr-10 lg:w-[calc(100vw-20rem)]'>
      <img src={'/logo.png'} className='w-32 lg:hidden' />
      <div className='ml-auto'>
        <Button clickFunc={Logout} type='OUTLINED'>
          Logout
        </Button>
      </div>
      <div
        onClick={() => setProfileOption((Prev) => !Prev)}
        className={`relative hidden h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 lg:ml-auto ${
          profileOption
            ? 'border-gray-300 bg-gray-200/50 hover:bg-gray-300'
            : 'border-gray-200 bg-white hover:bg-gray-50'
        }   `}
      >
        <MdPerson className='pointer-events-none fill-black' />
        {profileOption && (
          <div className='absolute top-16 -right-4 flex h-fit w-full min-w-[10rem] flex-col justify-between overflow-hidden rounded-xl border-2 border-gray-300 bg-gray-50 shadow-sm'></div>
        )}
      </div>
    </header>
  );
};
