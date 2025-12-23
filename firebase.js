import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDFG-bJpl1UbtXh1xfGsBaxMFzJ2YHOTV4",
  authDomain: "authentication-8e175.firebaseapp.com",
  databaseURL: "https://authentication-8e175-default-rtdb.firebaseio.com",
  projectId: "authentication-8e175",
  storageBucket: "authentication-8e175.firebasestorage.app",
  messagingSenderId: "1001870835574",
  appId: "1:1001870835574:web:c9fc8125007232bf228457",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Firebase services
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
