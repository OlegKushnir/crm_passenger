import React from "react";
import { NavLink } from "react-router-dom";


const DriverMenu = () => {
  return (
    <>
      <NavLink to="vehicles" className="nav-link item">
        Vehicles
      </NavLink>
    </>
  );
};

export default DriverMenu;