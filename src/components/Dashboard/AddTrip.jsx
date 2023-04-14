import React from "react";
import { Card, Form, Button, Table, Alert } from "react-bootstrap";
import { useState, useRef } from "react";
import { addTrip } from "../../firebase/firestore";
import { useAuth } from "../../contexts/AuthContext";
import PropTypes from "prop-types";

const AddTrip = ({ showNewTrip, drivers, vehicles }) => {
  const { currentUser } = useAuth();
  const driverRef = useRef();
  const fromRef = useRef();
  const toRef = useRef();
  const regNumRef = useRef();
  const passengersRef = useRef();
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [driver, setDriver] = useState("");

  const selectedVeh = vehicles.reduce((acc, veh) => {
    if (veh.owner === driver) acc.push(veh);
    return acc;
  }, []);


  async function handleSubmit(event) {
    event.preventDefault();
    const newTrip = {
      creator: currentUser.uid,
      driver: driverRef.current.value,
      regNum: regNumRef.current.value,
      from: fromRef.current.value,
      to: toRef.current.value,
      passengers: passengersRef.current.value,
    };

    try {
      setErr("");
      setLoading(true);
      const res = await addTrip(newTrip);
      showNewTrip({ uid: res, ...newTrip });
    } catch (e) {
      setErr("Failed to add new Trip.");
      console.log(e.message);
    }
    setLoading(false);
  }

  function handleDriver(event) {
    setDriver(event.target.value);
  }

  return (
    <div className="d-flex dashboard">
      <Card className="w-100 p-2">
        <h3>Add new Trip</h3>
        <p>First choose a driver to choose a vehicle.</p>
        <Form onSubmit={handleSubmit}>
          <Table striped bordered hover>
            <tbody>
              <tr>
                <td>
                  <Form.Control
                    as="select"
                    id="driver"
                    onChange={handleDriver}
                    required
                    ref={driverRef}
                  >
                    <option value="">Driver</option>
                    {drivers.map((driver) => (
                      <option
                        key={driver.uid}
                        value={driver.uid}
                      >{`${driver.firstName} ${driver.lastName}`}</option>
                    ))}
                  </Form.Control>
                </td>
                <td>
                  <Form.Control
                    as="select"
                    id="vehicle"
                    required
                    ref={regNumRef}
                  >
                    <option value="">Vehicle</option>
                    {selectedVeh.map((veh) => (
                      <option
                        key={veh.uid}
                        value={veh.regNum}
                      >{`${veh.brand} ${veh.regNum}`}</option>
                    ))}
                  </Form.Control>
                </td>
                <td>
                  <Form.Control as="select" id="from" required ref={fromRef}>
                    <option value="">From</option>
                    <option value="Kyiv">Kyiv</option>
                    <option value="Odesa">Odesa</option>
                    <option value="Lviv">Lviv</option>
                  </Form.Control>
                </td>
                <td>
                  <Form.Control as="select" id="to" required ref={toRef}>
                    <option value="">To</option>
                    <option value="Kyiv">Kyiv</option>
                    <option value="Odesa">Odesa</option>
                    <option value="Lviv">Lviv</option>
                  </Form.Control>
                </td>
                <td>
                  <Form.Control
                    type="number"
                    placeholder="Passengers"
                    required
                    ref={passengersRef}
                  />
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

export default AddTrip;

AddTrip.propTypes = {
  showNewTrip: PropTypes.func.isRequired,
  drivers: PropTypes.arrayOf(
    PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      uid: PropTypes.string.isRequired,
    })
  ).isRequired,
  vehicles: PropTypes.arrayOf(
    PropTypes.shape({
      brand: PropTypes.string.isRequired,
      owner: PropTypes.string.isRequired,
      regNum: PropTypes.string.isRequired,
      uid: PropTypes.string.isRequired,
    })
  ).isRequired,
};
