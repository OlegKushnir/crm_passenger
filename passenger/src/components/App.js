import React from "react";
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { useEffect } from "react";
// import { fetchCurrentUser } from "../redux/auth/operations";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
// import { getIsFetchingCurrent } from '../redux/auth/selectors';
import Navigation from "./Navigation/Navigation";
import { AuthProvider } from "../contexts/AuthContext";

const PhoneAuth = lazy(() => import("./Auth/PhoneAuth"));
const Register = lazy(() => import("./Auth/Register"));
const Login = lazy(() => import("./Auth/Login"));
const User = lazy(() => import("./User/User"));

function App() {
  // const dispatch = useDispatch();
  // const isFetchingCurrentUser = useSelector(getIsFetchingCurrent);
  // useEffect(() => {
  //   dispatch(fetchCurrentUser());
  // }, [dispatch]);
  return (
    // !isFetchingCurrentUser && (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route
            index
            element={
              <PublicRoute restricted redirectTo="/user">
                <Login />
              </PublicRoute>
            }
          />

          <Route
            path="/register"
            element={
              <PublicRoute restricted>
                <Register />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute restricted redirectTo="/user">
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/phonelogin"
            element={
              <PublicRoute restricted redirectTo="/user">
                <PhoneAuth />
              </PublicRoute>
            }
          />
          <Route
            path="/user"
            element={
              <PrivateRoute>
                <User />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
  // );
}

export default App;
