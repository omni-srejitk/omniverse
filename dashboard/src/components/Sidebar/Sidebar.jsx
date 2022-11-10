import React from 'react';

import { NavLink } from 'react-router-dom';

import { SIDEBAR_LINKS } from '../../utils/constants';

export const Sidebar = () => {
  return (
    <div className='fixed left-0 z-40 h-screen w-24 border-r-2 border-gray-100 bg-white px-6 pt-2 shadow-sm lg:w-[20rem]'>
      <div className='items-center my-4 flex h-10 w-10 justify-center rounded-full'>
        <img src={'/logo_icon.png'} className='w-full' />
      </div>
      {SIDEBAR_LINKS.map(({ title, id, icon, link, active }) => {
        return (
          <NavLink
            key={id}
            to={link}
            className={`relative ${
              active ? 'pointer-events-auto' : 'pointer-events-none'
            } items-center my-4 flex w-full justify-start gap-0 rounded-xl p-1 text-gray-400 hover:bg-gray-100 hover:text-black hover:shadow-sm lg:my-4 lg:gap-4`}
          >
            <span className='material-icons text-3xl'>{icon}</span>

            <p className=' hidden font-medium lg:block'>{title}</p>
            {!active && (
              <div className='absolute top-0 -right-4 rounded-md border-2 border-red-300 bg-white p-[2px] text-[8px] font-semibold text-red-400 lg:static lg:top-0 lg:right-0 lg:p-1 lg:text-xs'>
                SOON
              </div>
            )}
          </NavLink>
        );
      })}
    </div>
  );
};
