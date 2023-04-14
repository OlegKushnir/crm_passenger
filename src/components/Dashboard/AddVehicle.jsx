import React from "react";
import { Card, Form, Button, Table, Alert } from "react-bootstrap";
import { useState, useRef } from "react";
import { addVehicle } from "../../firebase/firestore";
import { useAuth } from "../../contexts/AuthContext";
import PropTypes from "prop-types";


const AddVehicle = ({ showNewVehicle, drivers }) => {
  const { firestoreUser } = useAuth();
  const regNumRef = useRef();
  const ownerRef = useRef();
  const brandRef = useRef();
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const newVehicle = {
      owner: ownerRef?.current?.value || firestoreUser.uid,
      regNum: regNumRef.current.value,
      brand: brandRef.current.value,
    };

    try {
      setErr("");
      setLoading(true);
      const res = await addVehicle(newVehicle);
      showNewVehicle({ uid: res, ...newVehicle });
    } catch (e) {
      setErr("Failed to add new Vehicle.");
      console.log(e.message);
    }
    setLoading(false);
  }

  return (
    <div className="d-flex dashboard">
      <Card className="w-100 p-2">
        <h3>Add new Vehicle</h3>
        <Form onSubmit={handleSubmit}>
          <Table striped bordered hover>
            <tbody>
              <tr>
                {firestoreUser.role === "admin" && (
                  <td>
                    <Form.Control
                      as="select"
                      id="owner"
                      required
                      ref={ownerRef}
                    >
                      <option value="">Owner</option>
                      {drivers.map((driver) => (
                        <option
                          key={driver.uid}
                          value={driver.uid}
                        >{`${driver.firstName} ${driver.lastName}`}</option>
                      ))}
                    </Form.Control>
                  </td>
                )}
                <td>
                  <Form.Control
                    type="text"
                    placeholder="Brand"
                    id="brand"
                    required
                    ref={brandRef}
                  ></Form.Control>
                </td>
                <td>
                  <Form.Control
                    type="text"
                    id="regNum"
                    placeholder="Registration Number"
                    required
                    ref={regNumRef}
                  ></Form.Control>
                </td>
                <td>
                  <Button disabled={loading} type="submit" className="w-100">
                    Add
                  </Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </Form>
        {err && <Alert variant="danger">{err}</Alert>}
      </Card>
    </div>
  );
};

export default AddVehicle;

AddVehicle.propTypes = {
  showNewVehicle: PropTypes.func.isRequired,
  drivers: PropTypes.arrayOf(
    PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      uid: PropTypes.string.isRequired,
    })
  ).isRequired
};