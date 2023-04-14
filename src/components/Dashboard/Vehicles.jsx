import React from "react";
import { Button, Alert, Card, Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import {
  getVehicles,
  getDrivers,
  deleteVehicle,
} from "../../firebase/firestore";
import { useAuth } from "../../contexts/AuthContext";
import AddVehicle from "./AddVehicle";

const Vehicles = () => {
  const { firestoreUser } = useAuth();
  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  function showNewVehicle(newVehicle) {
    setVehicles([...vehicles, newVehicle]);
  }

  async function handleDelete(tripId, index) {
    await deleteVehicle(tripId);
    const newVh = vehicles;
    newVh.splice(index, 1);
    setVehicles([...newVh]);
  }

  useEffect(() => {
    const fetchVehicles = async () => {
      firestoreUser.role === "admin"
        ? setVehicles(await getVehicles())
        : setVehicles(await getVehicles(firestoreUser.uid));
      const driversArr = await getDrivers();
      setDrivers(driversArr);
    };
    fetchVehicles();
  }, [firestoreUser.role, firestoreUser.uid]);

  return (
    <Card className="h-100">
      <Card.Body>
        <h3>Vehicles</h3>
        <p>To add a vehicle you must have user-drivers.</p>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              {firestoreUser.role === "admin" && <th>Owner</th>}
              <th>Brand</th>
              <th>Registration Number</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {vehicles?.map(({ uid, owner, brand, regNum }, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                {firestoreUser.role === "admin" && (
                  <td>
                    {drivers.find((dr) => dr.uid === owner)?.firstName || owner}
                  </td>
                )}
                <td>{brand}</td>
                <td>{regNum}</td>
                <td>
                  <Button onClick={() => handleDelete(uid, index)}>Del</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {vehicles?.length === 0 && <Alert variant="info">No vehicles yet</Alert>}
        <AddVehicle showNewVehicle={showNewVehicle} drivers={drivers} />
      </Card.Body>
    </Card>
  );
};

export default Vehicles;
