import { useRef, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import {useNavigate} from "react-router-dom"
import { Card, Form, Button, Alert } from "react-bootstrap";

const Register = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmRef = useRef();
  const { register } = useAuth();
  const [err, setErr] = useState('');
  const [loading, setLoading]= useState(false)
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    if(passwordRef.current.value !== confirmRef.current.value) {
      return setErr('Confirm password should equel password')
    }
    try {
      setErr('')
      setLoading(true)
      await register(emailRef.current.value, passwordRef.current.value);
      navigate("/login");

    } catch {
      setErr('Failed to register')
    }
    setLoading(false)
  }

  return (
    <>
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
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};
export default Register;
