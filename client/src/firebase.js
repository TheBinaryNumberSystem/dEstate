// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "destate-682e7.firebaseapp.com",
  projectId: "destate-682e7",
  storageBucket: "destate-682e7.appspot.com",
  messagingSenderId: "227549296757",
  appId: "1:227549296757:web:751b9805f8ac36a761203c",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
