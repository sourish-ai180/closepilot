import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDiqIC99DvpQn_gWeWm1unpgGM6hmibXww",
  authDomain: "studio-6964133190-7bd5e.firebaseapp.com",
  projectId: "studio-6964133190-7bd5e",
  storageBucket: "studio-6964133190-7bd5e.firebasestorage.app",
  messagingSenderId: "788545029908",
  appId: "1:788545029908:web:89c3846fc4ac0c193ee401"
};

const app = initializeApp(firebaseConfig);

// 🔥 THESE TWO EXPORTS MUST EXIST
export const auth = getAuth(app);
export const db = getFirestore(app);
