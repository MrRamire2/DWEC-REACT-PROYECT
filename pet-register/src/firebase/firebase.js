import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBh_cYoq-2BIeXcm0mmcrGSEEyHc6XuyJA",
  authDomain: "petregisterdb.firebaseapp.com",
  projectId: "petregisterdb",
  storageBucket: "petregisterdb.firebasestorage.app",
  messagingSenderId: "958590442273",
  appId: "1:958590442273:web:96a52516c7d8a0c2e67c60",
  measurementId: "G-NE4PBWJYG0",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
