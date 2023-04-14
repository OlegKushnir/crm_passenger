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
    await createUserWithEmailAndPassword(auth, email, password);
  }

  async function login(email, password) {
    const credentials = await signInWithEmailAndPassword(auth, email, password);
    return credentials;
  }

  function logout() {
    setCurrentUser(null);
    setFirestoreUser(null);
    return signOut(auth);
  }

  async function googleLogin() {
    await signInWithPopup(auth, googleAuthProvider);
  }

  async function facebookLogin() {
    await signInWithPopup(auth, facebookProvider);
  }

  async function recaptcha(number) {
    const recaptchaVerifier = new RecaptchaVerifier("recapcha-box", {}, auth);
    recaptchaVerifier.render();
    return signInWithPhoneNumber(auth, number, recaptchaVerifier);
  }

  useEffect(() => {
    const fetchFirestoreUser = async (user) => {
      if (!user?.uid) return;
      const res = await getUserFirestore(user.uid);
      if (!res) {
        const resNone = await createUser({ user });
        setFirestoreUser(resNone);
        return;
      }
      setFirestoreUser(res);
    };

    const unsubscribe = auth.onAuthStateChanged((user) => {
      fetchFirestoreUser(user);
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
