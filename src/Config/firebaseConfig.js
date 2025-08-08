import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDAYXqDbQoot-zZtMMKX62PpTFGW6F4m_0",
  authDomain: "student-management-77973.firebaseapp.com",
  projectId: "student-management-77973",
  storageBucket: "student-management-77973.firebasestorage.app",
  messagingSenderId: "293971436063",
  appId: "1:293971436063:web:fc4f76213462d417bd2b2a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();


