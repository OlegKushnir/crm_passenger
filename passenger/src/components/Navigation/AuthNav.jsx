import { NavLink } from 'react-router-dom';

export const AuthNav = () => {
  return (
    <>
      <NavLink to="register">
        <span>Register</span>
      </NavLink>
      <NavLink to="login">
        <span>Login</span>
      </NavLink>
    </>
  );
};