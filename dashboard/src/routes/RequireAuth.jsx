import { Navigate, useLocation, Outlet } from 'react-router';
import React from 'react';
import { useFilter } from '../context/FilterContext/FilterContext';

const RequireAuth = () => {
  const { ISLOGGED } = useFilter();
  const location = useLocation();

  return ISLOGGED ? (
    <Outlet />
  ) : (
    <Navigate state={{ from: location }} to='/' replace />
  );
};

export default RequireAuth;
