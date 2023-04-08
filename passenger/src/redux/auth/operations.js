import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  addDoc,
  getDocs,
  query, where
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { database, app } from "../../firebase/firebase";

const loginAPI = async (credentials) => {
  const users = await getDocs(collection(database, "users"));
  console.log("database", users);
};

export const googleAuth = createAsyncThunk(
  "auth/register",
  async (userInfo, { rejectWithValue }) => {
    try {
      const ref = collection(database, "users");
      const q = query(ref, where("email", "==", userInfo.email));
      console.log('docSnap', q);
      if (q) {
        console.log("User alredy exist!");
        throw Error;
      } else {
        console.log("No such document!");
        const docRef = await addDoc(collection(database, "users"), userInfo);
        console.log("Document written with ID: ", docRef.id);
        const { name, email, accessToken } = userInfo;
        return {
          user: {
            name,
            email,
          },
          accessToken,
        };
      }
    } catch (e) {
      console.error("Error adding document: ", e);
      return rejectWithValue(e.message);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (userInfo, { rejectWithValue }) => {
    try {
      const ref = collection(database, "users");
      const q = query(ref, where("email", "==", userInfo.email));
      console.log('docSnap', q);
      if (q) {
        console.log("User alredy exist!");
        throw Error;
      } else {
        console.log("No such document!");
        const docRef = await addDoc(collection(database, "users"), userInfo);
        console.log("Document written with ID: ", docRef.id);
        const { name, email, accessToken } = userInfo;
        return {
          user: {
            name,
            email,
          },
          accessToken,
        };
      }
    } catch (e) {
      console.error("Error adding document: ", e);
      return rejectWithValue(e.message);
    }
  }
);

export const login = createAsyncThunk("auth/login", loginAPI);

export const logout = createAsyncThunk("auth/logout", async () => {
  
  await app.auth().signOut();
  console.log('LOGOUT');  
  return 
});

export const fetchCurrentUser = createAsyncThunk("auth/refresh", async () => {
  console.log("refreshUser");
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
    console.log("User detected!");
    return auth.currentUser;
  } else {
    console.log("User is signed out");
  }
});
