import React from 'react';

import { NavLink } from 'react-router-dom';

import { SIDEBAR_LINKS } from '../../utils/constants';

export const Sidebar = () => {
  return (
    <div className='fixed left-0 z-40 h-screen w-24 border-r-2 border-gray-100 bg-white px-6 pt-16 shadow-sm lg:w-[20rem]'>
      {SIDEBAR_LINKS.map(({ title, id, icon, link, active }) => {
        return (
          <NavLink
            key={id}
            to={link}
            className='my-4 flex w-full items-center justify-start gap-0 rounded-xl p-1 text-gray-400 hover:bg-gray-100 hover:text-black hover:shadow-sm lg:my-4 lg:gap-4'
          >
            <span className='material-icons text-3xl'>{icon}</span>
            <p className=' hidden font-medium lg:block'>{title}</p>
          </NavLink>
        );
      })}
    </div>
  );
};
