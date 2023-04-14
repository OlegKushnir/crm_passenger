import React from "react";
import { useState, useEffect } from "react";
import { updateUserFirestore } from "../../firebase/firestore";
import { useAuth } from "../../contexts/AuthContext";
import { Card, Form, Button, Alert } from "react-bootstrap";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

const Profile = () => {
  const [profile, setProfile] = useState([]);
  const { firestoreUser } = useAuth();
  const [dateInput, setDateInput] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const params = {};
    if (firstName && firstName !== profile.firstName) params.firstName = firstName;
    if (lastName && lastName !== profile.lastName) params.lastName = lastName;
    if (dateInput && dateInput !== profile.dateOfBirth) params.dateOfBirth = dateInput;
    if (phoneNumber && phoneNumber !== profile.phoneNumber) params.phoneNumber = phoneNumber;

    try {
      setErr("");
      setLoading(true);
      await updateUserFirestore(profile.uid, params);
      setMessage("User updated");
    } catch (error) {
      setErr("Failed to update user.");
      console.error(error.message);
    }
    setLoading(true);
  }

  function handleDate(event) {
    setDateInput(event.target.value);
    setLoading(false);
  }
  function handleFirstName(event) {
    setFirstName(event.target.value);
    setLoading(false);
  }
  function handleLastName(event) {
    setLastName(event.target.value);
    setLoading(false);
  }
  function handlePhone() {
    setLoading(false);
  }

  useEffect(() => {
    setProfile(firestoreUser);
    setFirstName(firestoreUser.firstName);
    setLastName(firestoreUser.lastName);
    setDateInput(firestoreUser.dateOfBirth);
    setPhoneNumber(firestoreUser.phoneNumber);
  }, [firestoreUser]);
  
  return (
    <Card className="h-100">
      <Card.Body style={{maxWidth: "500px"}}>
        <h2 className="text-center mb-4">Profile</h2>
        {err && <Alert variant="danger">{err}</Alert>}
        {message && <Alert variant="success">{message}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group id="firstname">
          <Form.Label>Role</Form.Label>
            <Form.Control
              type="text"
              readOnly
              placeholder={profile.role}
            />
            <Form.Label>First name</Form.Label>
            <Form.Control
              type="text"
              value={firstName}
              onChange={handleFirstName}
            />
          </Form.Group>
          <Form.Group id="lastname">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              type="text"
              value={lastName}
              onChange={handleLastName}
            />
          </Form.Group>
          <Form.Group id="email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" readOnly placeholder={profile.email} />
          </Form.Group>
          <Form.Group id="dateOfBirth">
            <Form.Label>Date of birth</Form.Label>
            <Form.Control type="date" value={dateInput} onChange={handleDate} />
          </Form.Group>
          <Form.Group id="phone" onChange={handlePhone}>
            <Form.Label>Phone</Form.Label>
            <div className="form-control">
              <PhoneInput
                type="text"
                placeholder={profile.phoneNumber}
                value={phoneNumber}
                onChange={setPhoneNumber}
              />
            </div>
          </Form.Group>
          <Button disabled={loading} className="mt-4" type="submit">
            Update Profile
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default Profile;
