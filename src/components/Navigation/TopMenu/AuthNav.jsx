import { NavLink } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

export const AuthNav = () => {
  return (
    <Navbar className="d-flex justify-content-end z-2" bg="dark" variant="dark">
      <Nav className="me-auto">
        <NavLink to="register" className="nav-link">Register</NavLink>
        <NavLink to="login" className="nav-link">Login</NavLink>
      </Nav>
    </Navbar>
  );
};
