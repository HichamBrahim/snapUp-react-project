import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDTbvfx6DhRs_PZaNN9zp6o-PJk95T-Oa8",
  authDomain: "snapup-2c6d6.firebaseapp.com",
  projectId: "snapup-2c6d6",
  storageBucket: "snapup-2c6d6.appspot.com",
  messagingSenderId: "349633829292",
  appId: "1:349633829292:web:77579bde9ebf2f6d8d8209",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
