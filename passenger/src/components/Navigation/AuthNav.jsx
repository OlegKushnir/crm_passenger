import { NavLink } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

export const AuthNav = () => {
  return (
    <Navbar className="d-flex justify-content-end" bg="light" variant="light">
      <Nav className="me-auto">
        <Nav.Link>
          <NavLink to="register">
            <span>Register</span>
          </NavLink>
        </Nav.Link>
        <Nav.Link>
          <NavLink to="login">
            <span>Login</span>
          </NavLink>
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};
