// import { useDispatch, useSelector } from 'react-redux';
// import { getUserName } from '../../redux/auth/selectors';
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Navbar, Button, Alert } from "react-bootstrap";

export const UserMenu = () => {
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { logout, currentUser } = useAuth();
  const [userName, setUserName] = useState(null);

  async function handleClick(event) {
    event.preventDefault();
    try {
      setErr("");
      setLoading(true);
      await logout();
      navigate("/login");
    } catch {
      setErr("Failed to log out");
    }
    setLoading(false);
  }

  useEffect(() => {
    if (!userName && currentUser.displayName) {
      setUserName(currentUser.displayName);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Navbar
      className="d-flex justify-content-between"
      bg="light"
      variant="light"
    >
      <Navbar.Brand>{userName}</Navbar.Brand>

      <Button
        disabled={loading}
        type="button"
        onClick={handleClick}
        variant="outline-primary"
      >
        Logout
      </Button>
      {err && <Alert variant="danger">{err}</Alert>}
    </Navbar>
  );
};
