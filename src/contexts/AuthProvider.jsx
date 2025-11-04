import React, { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebase.config";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

  const signUpUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  }
  const signOutUser = () => {
    setLoading(true);
    return signOut(auth);
  }
  const signInGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  }

  const updateUser = (updateData) => {
    return updateProfile(auth.currentUser, updateData);
  };

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    })
    return () => unsubscribe();
  },[])

  const authInfo = {
    user,
    setUser,
    loading,
    signUpUser,
    signInUser,
    signOutUser,
    signInGoogle,
    updateUser,
  };
  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
