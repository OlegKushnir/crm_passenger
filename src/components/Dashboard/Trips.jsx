import React from "react";
import { Button, Alert, Card, Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import {
  getAllTrips,
  getDrivers,
  deleteTrip,
  getVehicles,
} from "../../firebase/firestore";
import AddTrip from "./AddTrip";

const Trips = () => {
  const { firestoreUser } = useAuth();
  const [trips, setTrips] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [renderBtns, setRenderBtns] = useState(false);

  function showNewTrip(newTrip) {
    setTrips([...trips, newTrip]);
  }

  async function handleDelete(tripId, index) {
    await deleteTrip(tripId);
    const newTr = trips;
    newTr.splice(index, 1);
    setTrips([...newTr]);
  }

  useEffect(() => {
    const fetchTrips = async () => {
      const tripsArr = await getAllTrips();
      const driversArr = await getDrivers();
      const vehArr = await getVehicles();
      setTrips(tripsArr);
      setDrivers(driversArr);
      setVehicles(vehArr);
      if (firestoreUser?.role === "admin" || firestoreUser?.role === "manager")
        setRenderBtns(true);
    };
    fetchTrips();
  });

  return (
    <Card className="h-100">
      <Card.Body>
        <h3>Trips</h3>
        <p>To add a trip you must have user-drivers and added vehicles.</p>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Trip ID</th>
              <th>Driver</th>
              <th>Vehicle</th>
              <th>From</th>
              <th>To</th>
              <th>Passengers</th>
              {renderBtns ? <th></th> : ""}
              
            </tr>
          </thead>
          <tbody>
            {trips?.map(
              ({ uid, driver, regNum, from, to, passengers }, index) => (
                <tr key={index}>
                  <td>{uid}</td>
                  <td>
                    {drivers.find((dr) => dr.uid === driver)?.firstName ||
                      driver}
                  </td>
                  <td>
                    {vehicles.find((vh) => vh.regNum === regNum)?.brand}{" "}
                    {vehicles.find((vh) => vh.regNum === regNum)?.regNum}
                  </td>
                  <td>{from}</td>
                  <td>{to}</td>
                  <td>{passengers}</td>

                  {renderBtns ? (
                    <td>
                      <Button onClick={() => handleDelete(uid, index)}>
                        Del
                      </Button>
                    </td>
                  ) : (
                    ""
                  )}
                </tr>
              )
            )}
          </tbody>
        </Table>
        {trips.length === 0 && <Alert variant="info">No trips yet</Alert>}
        {renderBtns ? (
          <AddTrip
            showNewTrip={showNewTrip}
            drivers={drivers}
            vehicles={vehicles}
          />
        ) : (
          ""
        )}
      </Card.Body>
    </Card>
  );
};

export default Trips;
