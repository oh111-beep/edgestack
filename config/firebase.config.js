// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "edgestack-43fe2.firebaseapp.com",
  projectId: "edgestack-43fe2",
  storageBucket: "edgestack-43fe2.firebasestorage.app",
  messagingSenderId: "987343559803",
  appId: "1:987343559803:web:4598c011ac54fe807f96de"
};

// Initialize Firebase
const app = getApps().length == 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const storage = getStorage(app);

export {db,storage};