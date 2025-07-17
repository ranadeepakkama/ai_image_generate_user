// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDrZYfuRg6EZTHJhpapCjvUQ8UpR4CMNFE",
  authDomain: "gible-style-project.firebaseapp.com",
  projectId: "gible-style-project",
  storageBucket: "gible-style-project.firebasestorage.app",
  messagingSenderId: "154545903836",
  appId: "1:154545903836:web:8b22a5495802e8c8d13c19",
  measurementId: "G-BFTQ42EMW1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider();