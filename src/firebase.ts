// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBxo2f_aAB1_ebGNCqOB1i3KVdavM_EZ_0",
  authDomain: "closepilot-58112.firebaseapp.com",
  projectId: "closepilot-58112",
  storageBucket: "closepilot-58112.firebasestorage.app",
  messagingSenderId: "556591368128",
  appId: "1:556591368128:web:baeda008a7139c12132a25",
  measurementId: "G-MMLDJDTR2D"
};

const app = initializeApp(firebaseConfig);

// 🔥 THESE TWO EXPORTS MUST EXIST
export const auth = getAuth(app);
export const db = getFirestore(app);
