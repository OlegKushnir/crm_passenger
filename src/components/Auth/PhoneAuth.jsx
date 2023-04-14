import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Card, Form, Button, Alert, Container } from "react-bootstrap";

const PhoneAuth = () => {
  const { recaptcha } = useAuth();
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [notVerified, setNotVerified] = useState(true);
  const [number, setNumber] = useState("");
  const [confirmObj, setConfirmObj] = useState(null);
  const [phoneMessage, setPhoneMessage] = useState("");
  const navigate = useNavigate();

  function onChange(event) {
    setPhoneMessage(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      setNotVerified(true);
      setErr("");
      setLoading(true);
      const res = await recaptcha(number);
      setConfirmObj(res);
    } catch {
      setErr("Error sending message");
    }
    setLoading(false);
    setNotVerified(false);
  }

  async function verifyPhoneMessage(event) {
    event.preventDefault();
    try {
      setErr("");
      setLoading(true);
      await confirmObj.confirm(phoneMessage);
      navigate("/home");
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
            {err && <Alert variant="danger">{err}</Alert>}
            {notVerified ? (
              <Form onSubmit={handleSubmit}>
                <Form.Group id="phone">
                  <Form.Label>Enter Your Phone</Form.Label>
                  <PhoneInput
                    type="text"
                    placeholder="Enter phone number"
                    required
                    value={number}
                    onChange={setNumber}
                  />
                </Form.Group>
                <div id="recapcha-box" className="w-100 mt-4"></div>
                <Button disabled={loading} className="w-100 mt-4" type="submit">
                  Verify
                </Button>
              </Form>
            ) : (
              <Form onSubmit={verifyPhoneMessage}>
                <Form.Group id="phoneverify">
                  <Form.Label>Confirmation</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter confirm code"
                    required
                    value={phoneMessage}
                    onChange={onChange}
                  />
                </Form.Group>
                <Button disabled={loading} className="w-100 mt-4" type="submit">
                  Confirm
                </Button>
              </Form>
            )}
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};
export default PhoneAuth;
