import { configureStore, createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import {
    register,
    login,
    logout,
    fetchCurrentUser
  } from './operations/operations';

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: { name: null, email: null },
    token: null,
    isLoggedIn: false,
    isFetchingCurrent: false,
  },
  extraReducers: {
    [register.fulfilled](state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    [login.fulfilled](state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    [logout.fulfilled](state) {
      state.user = { name: null, email: null };
      state.token = null;
      state.isLoggedIn = false;
    },
    [fetchCurrentUser.pending](state) {
      state.isFetchingCurrent = true;
    },
    [fetchCurrentUser.fulfilled](state, action) {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.isFetchingCurrent = false;
    },
    [fetchCurrentUser.rejected](state) {
      state.isFetchingCurrent = false;
    },
  },
});

export const getIsLoggedIn = (state) => state.auth.isLoggedIn;
export const getUserName = (state) => state.auth.user.name;
export const getIsFetchingCurrent = (state) => state.auth.isFetchingCurrent;

const authPersistConfig = {
    key: 'auth',
    storage,
    whitelist: ['token']
  }

const middleware = (getDefaultMiddleware) =>
getDefaultMiddleware({
  serializableCheck: {
    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  },
});

export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authSlice.reducer)
  },
  middleware,
});

export const persistor = persistStore(store);
