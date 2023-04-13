import React, { useState } from "react";
import { ListGroup, Nav } from "react-bootstrap";
import AdminMenu from "./AdminMenu";
import MainMenu from "./MainMenu";
import DriverMenu from "./DriverMenu";
import ManagerMenu from "./ManagerMenu";
import { useAuth } from "../../../contexts/AuthContext";
import { GiHamburgerMenu } from "react-icons/gi";

const SideMenu = () => {
  const { firestoreUser } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <ListGroup variant="secondary" className={!open ? "menu" : "menu opened"}>
      <Nav.Link
        className="d-flex justify-content-end pr-3"
        variant="light"
        onClick={() => setOpen(!open)}
      >
        <GiHamburgerMenu />
      </Nav.Link>

      <MainMenu />
      {firestoreUser.role === "admin" && <AdminMenu />}
      {firestoreUser.role === "driver" && <DriverMenu />}
      {firestoreUser.role === "manager" && <ManagerMenu />}
    </ListGroup>
  );
};

export default SideMenu;
