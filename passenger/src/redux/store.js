import { configureStore }  from "@reduxjs/toolkit";
// import storage from "redux-persist/lib/storage";
// import {
//   persistReducer,
//   persistStore,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from "redux-persist";
import authSlice from "./auth/slice";

// const authPersistConfig = {
//     key: 'auth',
//     storage,
//     whitelist: ['token']
//   }

// const middleware = (getDefaultMiddleware) =>
// getDefaultMiddleware({
//   serializableCheck: {
//     ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//   },
// });

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer
  },
  // middleware,
});

// export const persistor = persistStore(store);
