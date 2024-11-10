import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login, logout, setLoading } from "../store/authSlice";
import authService from "../services/authService";
import { useNavigate } from "react-router-dom";

const AuthCheck = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      dispatch(setLoading(true));
      try {
        const user = await authService.checkAuth(); // Check if user is authenticated

        if (user) {
          dispatch(login({ userData: user })); // Dispatch login with user data
        } else {
          dispatch(logout()); // If no user, dispatch logout
          navigate("/login");
        }
      } catch (error) {
        dispatch(logout()); // Handle any errors by logging out
        navigate("/login");
      } finally {
        dispatch(setLoading(false));
      }
    };

    checkAuth();
  }, [dispatch, navigate]);

  return null; // No UI to render
};

export default AuthCheck;
