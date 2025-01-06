import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loading from './Loading';

// AuthRoute.jsx - for routes that should only be accessible when NOT logged in
const AuthRoute = ({ element }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.user);

  if (loading) {
    return <Loading />;
  }

  return !isAuthenticated ? element : <Navigate to="/" replace />;
};

export default AuthRoute;