import { NavLink } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

export const AuthNav = () => {
  return (
    <Navbar className="d-flex justify-content-end" bg="light" variant="light">
      <Nav className="me-auto">
        <NavLink to="register" className="nav-link">Register</NavLink>
        <NavLink to="login" className="nav-link">Login</NavLink>
      </Nav>
    </Navbar>
  );
};
