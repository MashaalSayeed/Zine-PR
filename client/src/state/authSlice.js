import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    user: {}
  },
  reducers: {
    signin: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    signout: (state) => {
      state.isAuthenticated = false;
      state.user = {};
    },
  },
});

export const { signin, signout } = authSlice.actions;

export default authSlice.reducer;