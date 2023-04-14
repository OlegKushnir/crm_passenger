import { database } from "./firebase";
import {
  setDoc,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  collection,
  where,
  query,
  deleteDoc,
} from "firebase/firestore";
import { userConverter, tripConverter } from "./converters";

export async function getUserFirestore(id) {
  try {
    const docRef = doc(database, "users", id).withConverter(userConverter);
    const res = await getDoc(docRef);

    if (res.exists()) {
      const user = { uid: id, ...res.data() };
      return user;
    } else {
      console.log("No such user!");
    }
  } catch (err) {
    console.error(err.message);
  }
}

export async function createUser({ user }) {

  const userId = user?.uid;
  const registeredUser = {
    firstName: user?.displayName || user?.email || "User",
    lastName: "",
    email: user?.email || "",
    dateOfBirth: "",
    phoneNumber: user?.phoneNumber || "",
    role: null,
  };
  
  user?.email === process.env.REACT_APP_ADMIN_EMAIL
    ? (registeredUser.role = "admin")
    : (registeredUser.role = "passenger");

  try {
    await setDoc(doc(database, "users", userId), registeredUser);
    const resCreate = await getUserFirestore(userId);
    return resCreate;
  } catch (error) {
    console.log(error.message);
  }
}

export async function updateUserFirestore(docId, updateInfo) {
  try {
    const docRef = doc(database, "users", docId);
    await updateDoc(docRef, updateInfo);
  } catch (error) {
    console.log(error.message);
  }
}

export async function getDrivers() {
  try {
    const res = [];
    const usersRef = collection(database, "users");

    const q = query(usersRef, where("role", "==", "driver"));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      res.push({
        uid: doc.id,
        firstName: doc.data().firstName,
        lastName: doc.data().lastName,
      });
    });
    return res;
  } catch (err) {
    console.error(err.message);
  }
}

export async function getVehicles(driver) {
  try {
    const res = [];
    if (driver) {
      const usersRef = collection(database, "vehicles");
      const q = query(usersRef, where("owner", "==", driver));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        res.push({ uid: doc.id, ...doc.data() });
      });
      return res;
    }
    const querySnapshot = await getDocs(collection(database, "vehicles"));
    querySnapshot.forEach((doc) => {
      res.push({ uid: doc.id, ...doc.data() });
    });
    return res;
  } catch (err) {
    console.error(err.message);
  }
}

export async function getAllUsers() {
  try {
    const res = [];
    const querySnapshot = await getDocs(collection(database, "users"));

    querySnapshot.forEach((doc) => {
      res.push({ uid: doc.id, ...doc.data() });
    });
    return res;
  } catch (err) {
    console.error(err.message);
  }
}

export async function getTripByID(id) {
  try {
    const docRef = doc(database, "trips", id).withConverter(tripConverter);
    const res = await getDoc(docRef);

    if (res.exists()) {
      const user = { uid: id, ...res.data() };
      return user;
    } 
  } catch (err) {
    console.error(err.message);
  }
}

export async function getAllTrips() {
  try {
    const res = [];
    const querySnapshot = await getDocs(collection(database, "trips"));
    querySnapshot.forEach((doc) => {
      res.push({ uid: doc.id, ...doc.data() });
    });
    return res;
  } catch (err) {
    console.error(err.message);
  }
}

export async function addTrip(newTrip) {
  try {
    const res = await addDoc(collection(database, "trips"), newTrip);
    return res.id;
  } catch (err) {
    console.error(err.message);
  }
}

export async function addVehicle(newVehicle) {
  try {
    const res = await addDoc(collection(database, "vehicles"), newVehicle);
    return res.id;
  } catch (err) {
    console.error(err.message);
  }
}

export async function deleteTrip(tripId) {
  try {
    await deleteDoc(doc(database, "trips", tripId));
  } catch (err) {
    console.error(err.message);
  }
}

export async function deleteVehicle(vehicleId) {
  try {
    await deleteDoc(doc(database, "vehicles", vehicleId));
  } catch (err) {
    console.error(err.message);
  }
}
