import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { updateUserFirestore } from "../../firebase/firestore";
import PropTypes from "prop-types";


const UserParams = ({ user, setErr, setMessage }) => {
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState("");
  const roles = process.env.REACT_APP_ROLES.split(", ");

  async function handleSubmit(event) {
    event.preventDefault();
    const params = {};

    if (role !== user.role) params.role = role;

    try {
      setErr("");
      await updateUserFirestore(user.uid, params);
      setMessage("User updated");
    } catch (error) {
      setErr("Failed to update user.");
      console.error(error.message);
    }
    setLoading(true);
  }

  function handleRole(event) {
    setRole(event.target.value);
    setLoading(false);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="mb-2">
        <Col>
          <Form.Control plaintext readOnly defaultValue={user.uid}   />
        </Col>
        <Col>
          <Form.Control type="email" readOnly placeholder={user.email} />
        </Col>  
        <Col>
          <Form.Control type="phone" readOnly placeholder={user.phoneNumber} />
        </Col>
        <Col>
          <Form.Control
            as="select"
            defaultValue={user.role}
            onChange={handleRole}
          >
            {roles?.map((role) => {
              return (
                <option key={role} value={role}>
                  {role}
                </option>
              );
            })}
          </Form.Control>
        </Col>
        <Col>
          <Button disabled={loading} type="submit" className="w-100">
            Update
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default UserParams;

UserParams.propTypes = {
  setErr: PropTypes.func.isRequired,
  setMessage:PropTypes.func.isRequired,
  user: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      dateOfBirth: PropTypes.string,
      email: PropTypes.string,
      phoneNumber: PropTypes.string,
      role: PropTypes.string,
      uid: PropTypes.string.isRequired,
    }).isRequired
};