import { createAsyncThunk } from "@reduxjs/toolkit";
// import {
//     registerAPI,
//     loginAPI,
//     logoutAPI,
//     refreshUser
//   } from 'backend/backend';

const registerAPI = async (credentials) => {
  console.log("registerAPI");
};

const loginAPI = async (credentials) => {
  console.log("logInAPI");
};
const logoutAPI = async (credentials) => {
  console.log("logOutAPI");
};
const refreshUser = async (_, { getState, rejectWithValue }) => {
  console.log("refreshUser");
  const state = getState();
  const persistedToken = state.auth.token;
  if (persistedToken === null) return rejectWithValue();
};

export const register = createAsyncThunk("auth/register", registerAPI);

export const login = createAsyncThunk("auth/login", loginAPI);

export const logout = createAsyncThunk("auth/logout", logoutAPI);

export const fetchCurrentUser = createAsyncThunk("auth/refresh", refreshUser);
