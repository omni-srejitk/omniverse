import React from 'react';

import { NavLink } from 'react-router-dom';

import { SIDEBAR_LINKS } from '../../utils/constants';

export const Sidebar = () => {
  return (
    <div className='fixed left-0 h-screen w-24 bg-white px-6 shadow-sm lg:w-[20rem]'>
      <div className='my-4 h-10 p-3 '>Omniflo</div>

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
