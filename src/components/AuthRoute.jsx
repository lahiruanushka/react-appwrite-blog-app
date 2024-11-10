import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AuthRoute = ({ element }) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return !isAuthenticated ? element : <Navigate to="/" replace />;
};

export default AuthRoute;
