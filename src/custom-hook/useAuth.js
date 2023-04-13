import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "../firebase/firebase.config";
import { useState } from "react";
export function useAuth() {
  const [currentUser, setCurrentUser] = useState({});
  const [login, setLogin] = useState(JSON.parse(localStorage.getItem('login')) || false)
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        setLogin(true)
      } else {
        setCurrentUser(undefined);
        setLogin(false)
      }
    });
  }, []);
  useEffect(() => {
    localStorage.setItem('login', JSON.stringify(login))
  },[login])
  return {currentUser, login};
}
