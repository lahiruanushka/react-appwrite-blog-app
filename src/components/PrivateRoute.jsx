import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "./Loading";

const PrivateRoute = ({ element }) => {
  const { isAuthenticated, loading, userData } = useSelector((state) => state.user);
  const location = useLocation();

  console.log(userData);

  if (loading) {
    return <Loading />;
  }

  if (!isAuthenticated || !userData) {
    return <Navigate to="/sign-in" replace />;
  }

  // Check email verification only if userData exists
  if (userData && !userData.emailVerification && location.pathname !== '/verify-email') {
    return <Navigate to="/verify-email" replace />;
  }

  return element;
};

export default PrivateRoute;
