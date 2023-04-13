import { useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Card, Form, Button, Alert, Container } from "react-bootstrap";
import AuthButtons from "./AlternativeAuth";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      setErr("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
    } catch (e) {
      setErr("Failed to log in. Check your email / password.");
    }
    setLoading(false);
  }

  return (
    <Container
      className={"d-flex align-items-center justify-content-center"}
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
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
              <AuthButtons setLoading={setLoading} setErr={setErr} />
            </Form>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};
export default Login;
