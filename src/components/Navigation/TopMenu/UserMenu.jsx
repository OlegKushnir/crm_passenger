import { useAuth } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Navbar, Button, Alert } from "react-bootstrap";

export const UserMenu = () => {
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { logout, firestoreUser} = useAuth();


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
 
  return (
    <Navbar
      className="d-flex justify-content-between z-2"
      bg="dark"
      variant="dark"
    >
      <Navbar.Brand>
     { firestoreUser?.firstName} { firestoreUser?.lastName}
      </Navbar.Brand>

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
