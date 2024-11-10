import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login, logout, setLoading } from "../store/authSlice";
import authService from "../services/authService";

const AuthCheck = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      dispatch(setLoading(true));
      try {
        const user = await authService.checkAuth(); // Check if user is authenticated

        if (user) {
          dispatch(login({ userData: user })); // Dispatch login with user data
        } else {
          dispatch(logout()); // If no user, dispatch logout
        }
      } catch (error) {
        dispatch(logout()); // Handle any errors by logging out
      } finally {
        dispatch(setLoading(false));
      }
    };

    checkAuth();
  }, [dispatch]);

  return null; // No UI to render
};

export default AuthCheck;
