import React from "react";
import { lazy } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import Layout from "./Layout";
import { AuthProvider } from "../contexts/AuthContext";

const PhoneAuth = lazy(() => import("./Auth/PhoneAuth"));
const Register = lazy(() => import("./Auth/Register"));
const Login = lazy(() => import("./Auth/Login"));
const Home = lazy(() => import("./Dashboard/Home"));
const UsersEdit = lazy(() => import("./Dashboard/UsersEdit"));
const Trips = lazy(() => import("./Dashboard/Trips"));
const Profile = lazy(() => import("./Dashboard/Profile"));
const FindTrip = lazy(() => import("./Dashboard/FindTrip"));
const Vehicles = lazy(() => import("./Dashboard/Vehicles"));
const roles = process.env.REACT_APP_ROLES.split(", ");

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route element={<PublicRoute restricted redirectTo="/home" />}>
            <Route index element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/phonelogin" element={<PhoneAuth />} />
        </Route>
        <Route element={<PrivateRoute allowedRoles={roles}/>}>
          <Route path="/home" element={<Home />}>
            <Route index  element={<Profile />} />
            <Route path="/home/profile" element={<Profile />} />
            <Route path="/home/trips" element={<Trips />} />
            <Route path="/home/findtrip" element={<FindTrip />} />
            <Route element={<PrivateRoute allowedRoles={[roles[0]]} />}>
              <Route path="/home/editusers" element={<UsersEdit />} />
            </Route>
            <Route element={<PrivateRoute allowedRoles={[roles[0], roles[1]]} />}>
              <Route path="/home/trips" element={<Trips />} />
            </Route>
            <Route element={<PrivateRoute allowedRoles={[roles[0], roles[2]]} />}>
              <Route path="/home/vehicles" element={<Vehicles />} />
            </Route>
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/login" />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
