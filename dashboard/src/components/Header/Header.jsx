import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetAuthSlice } from '../../redux/features/authSlice';
import { resetDataSlice } from '../../redux/features/dataSlice';
import { resetFilterSlice } from '../../redux/features/filterSlice';
import { setProfilePopup } from '../../redux/features/popupSlice';
import { selectPopupState } from '../../redux/actions/popupActions';

export const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const POPUP_STATE = useSelector(selectPopupState);

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

      <div
        onClick={() =>
          POPUP_STATE.profile
            ? dispatch(setProfilePopup(false))
            : dispatch(setProfilePopup(true))
        }
        className={`relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg border-2 lg:ml-auto ${
          POPUP_STATE.profile
            ? 'border-gray-300 bg-gray-200/50'
            : 'border-gray-200 bg-white'
        }   `}
      >
        <span className='material-icons pointer-events-none flex select-none items-center justify-center text-sm text-gray-500'>
          person
        </span>
        {POPUP_STATE.profile && (
          <div className='absolute top-16 -right-0  flex h-fit w-[17.5rem] min-w-[10rem] flex-col justify-between overflow-hidden rounded-xl bg-white p-4 shadow-md'>
            <div className='h-full w-full'>
              <div
                className='flex h-12 w-full items-center justify-between rounded-xl px-3 font-semibold text-gray-500 hover:text-black'
                onClick={Logout}
              >
                <p>Logout</p>
                <span className='material-icons'>logout</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
