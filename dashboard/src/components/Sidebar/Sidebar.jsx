import React from 'react';

import { NavLink } from 'react-router-dom';

import { SIDEBAR_LINKS } from '../../utils/constants';

export const Sidebar = () => {
  return (
    <div className='fixed bottom-0 z-40 h-24 w-screen border-r-2 border-gray-100 bg-white px-6 pt-2 shadow-sm md:left-0 md:h-screen md:w-24 lg:w-[20rem]'>
      <div className='flex items-center justify-evenly md:flex-col md:items-start md:justify-start'>
        <div className='my-4 hidden  h-10 w-32 items-center justify-center rounded-full lg:flex'>
          <img src={'/logo.png'} className='w-full' />
        </div>
        {SIDEBAR_LINKS.map(({ title, id, icon, link, active }) => {
          return (
            <NavLink
              key={id}
              to={link}
              className={`relative ${
                active ? 'pointer-events-auto' : 'pointer-events-none'
              } my-4 flex w-full items-center justify-start gap-0 rounded-xl p-1 text-gray-400 hover:bg-gray-100 hover:text-black hover:shadow-sm lg:my-4 lg:gap-4`}
            >
              <span className='material-icons text-3xl'>{icon}</span>

              <p className=' hidden font-medium lg:block'>{title}</p>
              {!active && (
                <div className='absolute top-0 left-6 rounded-md border-2 border-red-300 bg-white p-[2px] text-[8px] font-semibold text-red-400 md:-right-4 lg:static lg:top-0 lg:right-0 lg:p-1 lg:text-xs'>
                  SOON
                </div>
              )}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};
