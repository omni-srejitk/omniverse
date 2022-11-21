import { Navigate, useLocation, Outlet } from 'react-router';
import React from 'react';

const RequireAuth = () => {
  const ISLOGGED =
    localStorage.getItem('Name') && localStorage.getItem('Token');
  const location = useLocation();

  return ISLOGGED ? (
    <Outlet />
  ) : (
    <Navigate state={{ from: location }} to='/' replace />
  );
};

export default RequireAuth;
