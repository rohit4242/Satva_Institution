import React, { createContext, useContext, useEffect, useState } from 'react';

import {
  // createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  getAuth,
} from 'firebase/auth';
import { ref, onValue } from 'firebase/database';
import { db, auth } from '../firebase';

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState({});
  const [userRole, setUserRole] = useState(null);

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  // function signUp(email, password) {
  //   return createUserWithEmailAndPassword(auth, email, password);
  // }
  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }
  function logOut() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      const dbRef = ref(db, 'User_Info/Users');
      onValue(dbRef, (snapshot) => {
        snapshot.forEach((item) => {
          if (currentuser.email === item.val().email) {
            const Role = item.val().role;
            setUserRole(Role);
            localStorage.setItem('xxIPNizysHe36MAunb1r4GMp0Rn1', Role);
          }
        });
      });
      setUser(currentuser);
      console.log('Current User Email: ', currentuser.email);
      console.log('Current User Role: ', userRole);
    });

    return () => {
      unsubscribe();
    };
  });

  return (
    <userAuthContext.Provider
      value={{ user, userRole, logIn, logOut, googleSignIn, getAuth }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
