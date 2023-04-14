import React, { useState, useEffect } from "react";
import { getAllUsers } from "../../firebase/firestore";
import { Card, Form, Row, Col, Alert } from "react-bootstrap";
import UserParams from "./UserParams";

const UsersEdit = () => {
  const [users, setUsers] = useState([]);
  const [err, setErr] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const usersArr = await getAllUsers();
      setUsers(usersArr);
    };
    fetchUsers();
  }, []);

  return (
    <Card className="h-100">
      <Card.Body>
        <h3>Edit users roles</h3>
        {err && <Alert variant="danger">{err}</Alert>}
        {message && <Alert variant="success">{message}</Alert>}
        <Row>
          <Col>
            <Form.Label>ID</Form.Label>
          </Col>
          <Col>
            <Form.Label>Email</Form.Label>
          </Col>
          <Col>
            <Form.Label>Phone</Form.Label>
          </Col>
          <Col>
            <Form.Label>Role</Form.Label>
          </Col>
          <Col>
            <Form.Label></Form.Label>
          </Col>
        </Row>

        {users?.map((user, index) => (
          <UserParams
            user={user}
            key={index}
            setErr={setErr}
            setMessage={setMessage}
          />
        ))}
      </Card.Body>
    </Card>
  );
};

export default UsersEdit;
