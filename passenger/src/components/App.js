import './App.css';
import React from 'react';
import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchCurrentUser } from '../redux/operations/operations';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import { getIsFetchingCurrent } from '../redux/store';
import Navigation from './Navigation/Navigation';
const Register = lazy(() => import('./Auth/Register'));
const Login = lazy(() => import('./Auth/Login'));
const User = lazy(() => import('./User/User'));

function App() {
  const dispatch = useDispatch();
  const isFetchingCurrentUser = useSelector(getIsFetchingCurrent);
  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);
  return (
    !isFetchingCurrentUser && (
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
            path="/user"
            element={
              <PrivateRoute>
                <User />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    )
  );
}

export default App;
