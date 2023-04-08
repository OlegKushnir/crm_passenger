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

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const value = {
    currentUser,
    register,
    login,
    logout,
    googleLogin,
    facebookLogin,
    recaptcha
  };

  function register(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function logout() {
    return signOut(auth);
  }

  function googleLogin() {
    const res = signInWithPopup(auth, googleAuthProvider)
    console.log('res', res);
    return res;
  }
  function facebookLogin() {
    return signInWithPopup(auth, facebookProvider);
  }

  function recaptcha(number) {
    const recaptchaVerifier = new RecaptchaVerifier(
      "recapcha-box",
      {},
      auth
    );
    recaptchaVerifier.render();
    return signInWithPhoneNumber(auth, number, recaptchaVerifier)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
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
