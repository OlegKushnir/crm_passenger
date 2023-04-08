import {  createSlice } from "@reduxjs/toolkit";
import {
    register,
    login,
    logout,
    fetchCurrentUser
  } from './operations';

const authSlice = createSlice({
    name: "auth",
    initialState: {
      user: { name: null, email: null },
      accessToken: null,
      isLoggedIn: false,
      isFetchingCurrent: false,
    },
    extraReducers: {
      [register.fulfilled](state, action) {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.isLoggedIn = true;
      },
      [login.fulfilled](state, action) {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.isLoggedIn = true;
      },
      [logout.fulfilled](state) {
        state.user = { name: null, email: null };
        state.accessToken = null;
        state.isLoggedIn = false;
      },
      [fetchCurrentUser.pending](state) {
        state.isFetchingCurrent = true;
      },
      [fetchCurrentUser.fulfilled](state, action) {
        state.user = action.payload;
        // state.isLoggedIn = true;
        state.isFetchingCurrent = false;
      },
      [register.rejected](state) {
        state.user = { name: null, email: null };
        state.accessToken = null;
        state.isLoggedIn = false;
      },
      [login.rejected](state) {
        state.user = { name: null, email: null };
        state.accessToken = null;
        state.isLoggedIn = false;
      },
      [fetchCurrentUser.rejected](state) {
        state.isFetchingCurrent = false;
        state.isLoggedIn = false;
      },
    },
  });

  export default authSlice;