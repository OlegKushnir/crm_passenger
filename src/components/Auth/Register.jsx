import { useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Card, Form, Button, Alert, Container } from "react-bootstrap";
import AuthButtons from "./AlternativeAuth";
import { createUser } from "../../firebase/firestore";

const Register = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmRef = useRef();
  const { register } = useAuth();
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    if (passwordRef.current.value !== confirmRef.current.value) {
      return setErr("Confirm password should equel password");
    }

    try {
      setErr("");
      setLoading(true);
      const credentials = await register(
        emailRef.current.value,
        passwordRef.current.value
      );
      await createUser(credentials);
    } catch (error) {
      setErr(error.message);
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
            <h2 className="text-center mb-4">Register Page</h2>
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
              <Form.Group id="confirm">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" required ref={confirmRef} />
              </Form.Group>
              <Button disabled={loading} className="w-100 mt-4" type="submit">
                Register
              </Button>
              <AuthButtons setLoading={setLoading} setErr={setErr} />
            </Form>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};
export default Register;
