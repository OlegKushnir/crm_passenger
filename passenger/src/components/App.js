import React from "react";
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import Layout from "./Layout";
import { AuthProvider } from "../contexts/AuthContext";

const PhoneAuth = lazy(() => import("./Auth/PhoneAuth"));
const Register = lazy(() => import("./Auth/Register"));
const Login = lazy(() => import("./Auth/Login"));
const Home = lazy(() => import("./User/Home"));
const UsersEdit = lazy(() => import("./User/UsersEdit"));
const Trips = lazy(() => import("./User/Trips"));
const Profile = lazy(() => import("./User/Profile"));
const FindTrip = lazy(() => import("./User/FindTrip"));
const Vehicles = lazy(() => import("./User/Vehicles"));


function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <PublicRoute restricted redirectTo="/home">
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
              <PublicRoute restricted redirectTo="/home">
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/phonelogin"
            element={
              <PublicRoute restricted redirectTo="/home">
                <PhoneAuth />
              </PublicRoute>
            }
          />
          <Route
            element={
              <PrivateRoute
                allowedRoles={["admin", "passenger", "driver", "manager"]}
              />
            }
          >
            <Route path="/home" element={<Home />}>
              <Route path="/home/profile" element={<Profile />} />
              <Route path="/home/findtrip" element={<FindTrip />} />
              <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
                <Route path="/home/editusers" element={<UsersEdit />} />
              </Route>
              <Route
                element={<PrivateRoute allowedRoles={["admin", "manager"]} />}
              >
                <Route path="/home/trips" element={<Trips />} />
              </Route>
              <Route
                element={<PrivateRoute allowedRoles={["admin", "driver"]} />}
              >
                <Route path="/home/vehicles" element={<Vehicles />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
