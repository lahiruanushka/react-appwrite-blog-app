import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loading from './Loading';

const AuthRoute = ({ element }) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const loading = useSelector((state) => state.user.loading);

  if (loading) {
    return <Loading />;
  }

  return !isAuthenticated ? element : <Navigate to="/" replace />;
};

export default AuthRoute;
