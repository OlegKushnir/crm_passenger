import React from "react";
import { NavLink } from "react-router-dom";

const MainMenu = () => {
  return (
    <>
      <NavLink to="/home/profile" className="nav-link item">
        Profile
      </NavLink>
      <NavLink to="findtrip" className="nav-link item">
        Find trip
      </NavLink>
    </>
  );
};

export default MainMenu;
