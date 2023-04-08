import { useAuth } from "../contexts/AuthContext";
import {
    auth,
    database
  } from "./firebase";
  import { collection, addDoc, setDoc, doc } from "firebase/firestore"; 
  
  const docData = {
    stringExample: "Hello world!",
    booleanExample: true,
    numberExample: 3.14159265,
    arrayExample: [5, true, "hello"],
    nullExample: null,
    objectExample: {
        a: 5,
        b: {
            nested: "foo"
        }
    }
}
  export async function createUser(userID) {
    
    try {
       const docRef = await setDoc(doc(database, "data", userID), docData);
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
  }