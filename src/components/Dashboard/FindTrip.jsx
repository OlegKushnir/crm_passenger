import React from "react";
import { useState } from "react";
import { getTripByID, getDrivers, getVehicles } from "../../firebase/firestore";

import { Card, Form, Button, Alert, Table } from "react-bootstrap";

const FindTrip = () => {
  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [tripId, setTripId] = useState("");
  const [foundTrip, setFoundTrip] = useState("");

  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);
  //   const [message, setMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      setErr("");
      setLoading(true);
      const res = await getTripByID(tripId);
      const driversArr = await getDrivers();
      const vehArr = await getVehicles();
      setFoundTrip(res);
      setDrivers(driversArr);
      setVehicles(vehArr);
    } catch (error) {
      setErr("Failed to update user.");
      console.error(error.message);
    }
    setLoading(true);
  }

  function handleChange(event) {
    setTripId(event.target.value);
    setLoading(false);
  }

  const { uid, driver, from, to, passengers } = foundTrip;

  return (
    <Card className="h-100">
      <Card.Body >
        <Card.Body style={{ maxWidth: "500px" }}>
          <h2 className="text-center mb-4">Find your trip by ID</h2>
          <p>Enter your trip ID (20 characters)</p>
          {err && <Alert variant="danger">{err}</Alert>}
          {/* {message && <Alert variant="success">{message}</Alert>} */}

          <Form onSubmit={handleSubmit}>
            <Form.Group id="tripID">
              <Form.Control
                type="text"
                placeholder="Enter trip ID..."
                onChange={handleChange}
              />
            </Form.Group>
            <Button disabled={loading} className="mt-4" type="submit">
              Find Trip
            </Button>
          </Form>
        </Card.Body>
       {foundTrip && <Table striped bordered hover>
          <thead>
            <tr>
              <th>Trip ID</th>
              <th>Driver</th>
              <th>Vehicle</th>
              <th>From</th>
              <th>To</th>
              <th>Passengers</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{uid}</td>
              <td>
                {drivers.find((dr) => dr.uid === driver)?.firstName || driver}
              </td>
              <td>
                {vehicles.find((vh) => vh.owner === driver)?.brand}{" "}
                {vehicles.find((vh) => vh.owner === driver)?.regNum}
              </td>
              <td>{from}</td>
              <td>{to}</td>
              <td>{passengers}</td>
            </tr>
          </tbody>
        </Table>}
        </Card.Body>
    </Card>
  );
};

export default FindTrip;
