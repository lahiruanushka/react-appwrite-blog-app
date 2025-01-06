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
        const user = await authService.checkAuth();
        if (user) {
          dispatch(login({ userData: user }));
        } else {
          dispatch(logout());
        }
      } catch (error) {
        console.error("Auth check error:", error);
        dispatch(logout());
      } finally {
        dispatch(setLoading(false));
      }
    };

    checkAuth();
  }, [dispatch]);

  return null;
};

export default AuthCheck;
