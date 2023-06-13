import React, { useState } from "react";
import { Nav } from "react-bootstrap";
import AdminMenu from "./AdminMenu";
import MainMenu from "./MainMenu";
import DriverMenu from "./DriverMenu";
import { useAuth } from "../../../contexts/AuthContext";
import { GiHamburgerMenu } from "react-icons/gi";

const SideMenu = () => {
  const { firestoreUser } = useAuth();
  const [open, setOpen] = useState(false);
  const roles = process.env.REACT_APP_ROLES.split(", ");

  return (
    <div className={!open ? "menu" : "menu opened"}>
      <Nav.Link
        className="d-flex justify-content-end pr-3"
        onClick={() => setOpen(!open)}
      >
        <GiHamburgerMenu />
      </Nav.Link>

      <MainMenu />
      {firestoreUser.role === roles[0] && <AdminMenu />}
      {firestoreUser.role === roles[2] && <DriverMenu />}
      {/* {firestoreUser.role === roles[1] && <ManagerMenu />} */}
    </div>
  );
};

export default SideMenu;
