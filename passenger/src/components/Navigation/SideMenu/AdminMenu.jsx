import React from "react";
import { NavLink } from "react-router-dom";
import ManagerMenu from "./ManagerMenu";
import DriverMenu from "./DriverMenu";

const AdminMenu = () => {
  return (
    <>
      <NavLink to="editusers" className="nav-link item">
        Edit users
      </NavLink>
      <ManagerMenu/>
      <DriverMenu/>
    </>
  );
};

export default AdminMenu;
