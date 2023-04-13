import { createContext, useContext, useState, useEffect } from "react";

import {
  auth,
  googleAuthProvider,
  facebookProvider,
} from "../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  RecaptchaVerifier,
  signInWithPhoneNumber, 
} from "firebase/auth";
import { createUser, getUserFirestore } from "../firebase/firestore";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [firestoreUser, setFirestoreUser] = useState(null);

  const [loading, setLoading] = useState(true);
  const value = {
    currentUser,
    firestoreUser,
    register,
    login,
    logout,
    googleLogin,
    facebookLogin,
    recaptcha,
  };

  async function register(email, password) {
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
     await createUser(credentials);
  }

  async function login(email, password) {
      const credentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      // await getUserFirestore(credentials.user.uid);
      return credentials;
  }

  function logout() {
    setCurrentUser(null);
    setFirestoreUser(null);
    return signOut(auth);
  }

  async function googleLogin() {
      const credentials = await signInWithPopup(auth, googleAuthProvider);
      await createUser(credentials);
  }
  async function facebookLogin() {
      const credentials = await signInWithPopup(auth, facebookProvider);
      await createUser(credentials);
  }

  async function recaptcha(number) {
    const recaptchaVerifier = new RecaptchaVerifier("recapcha-box", {}, auth);
    recaptchaVerifier.render();
    return signInWithPhoneNumber(auth, number, recaptchaVerifier);
  }

  useEffect(() => {
 
    const fetchFirestoreUser = async (uid) => {
      if (!uid) return;
      const res = await getUserFirestore(uid);
      setFirestoreUser(res);
    };

    const unsubscribe = auth.onAuthStateChanged((user) => {
      fetchFirestoreUser(user?.uid);
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
