// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDExvUP6nW09myzhaHZf_-dApPx2CgFTJk",
  authDomain: "next-giphy.firebaseapp.com",
  projectId: "next-giphy",
  storageBucket: "next-giphy.appspot.com",
  messagingSenderId: "644001538065",
  appId: "1:644001538065:web:2f62e3732c1d6fa43451b0",
  measurementId: "G-2684141XZ1"
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
