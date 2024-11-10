import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  userData: null,
  loading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.userData = action.payload.userData;
      state.loading = false;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userData = null;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { login, logout, setLoading } = authSlice.actions;
export default authSlice.reducer;
