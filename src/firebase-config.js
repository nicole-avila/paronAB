import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: `${import.meta.env.VITE_API_KEY}`,
  authDomain: "paron-project.firebaseapp.com",
  projectId: "paron-project",
  storageBucket: "paron-project.appspot.com",
  messagingSenderId: "881222413608",
  appId: "1:881222413608:web:d8b7e533c762cc92d7741d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
// const provider = new signInWithEmailAndPassword(auth, email, password)
