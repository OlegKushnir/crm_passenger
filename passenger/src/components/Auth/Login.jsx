import { useRef, useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaGoogle, FaFacebookSquare, FaPhone } from "react-icons/fa";
import { Card, Form, ButtonGroup, Button, Alert } from "react-bootstrap";
// import { createUser } from "../../firebase/firestore";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { currentUser, login, googleLogin, facebookLogin } = useAuth();
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      setErr("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/user");
    } catch {
      setErr("Failed to log in");
    }
    setLoading(false);
    console.log("current", user);
  }

  async function handleGoogleLogin(event) {
    event.preventDefault();
    try {
      setLoading(true);
      await googleLogin();
      navigate("/user");
    } catch (error) {
      setErr(error.message);
    }
    setLoading(false);
  }
  async function handleFacebookLogin(event) {
    event.preventDefault();
    try {
      setLoading(true);
      await facebookLogin();
      navigate("/user");
    } catch (error) {
      setErr(error.message);
    }
    setLoading(false);
  }

  async function handlePhoneLogin() {
    navigate("/phonelogin");
  }

  useEffect(() => {
    if (!user) {
      setUser(currentUser);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Login Page</h2>
          {err && <Alert variant="danger">{err}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" required ref={emailRef} />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" required ref={passwordRef} />
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-4" type="submit">
              Log in
            </Button>

            <ButtonGroup
              aria-label="Basic example"
              className="d-flex justify-content-center mt-4"
            >
              <Button variant="secondary" onClick={handleGoogleLogin}>
                <FaGoogle />
              </Button>
              <Button variant="secondary" onClick={handleFacebookLogin}>
                <FaFacebookSquare />
              </Button>
              <Button variant="secondary" onClick={handlePhoneLogin}>
                <FaPhone />
              </Button>
            </ButtonGroup>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};
export default Login;
