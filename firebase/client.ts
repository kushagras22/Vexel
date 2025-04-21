// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDGkTovt5gBYjX7RwFHJMMh_OcS_xnltks",
  authDomain: "vexel-975cb.firebaseapp.com",
  projectId: "vexel-975cb",
  storageBucket: "vexel-975cb.firebasestorage.app",
  messagingSenderId: "539776231644",
  appId: "1:539776231644:web:3c370b4ded1e5aff75ac19",
  measurementId: "G-NN97QF9H4C"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);

