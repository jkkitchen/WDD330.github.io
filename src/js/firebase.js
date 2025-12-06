//This is the code given by the Firebase Website in order to import it:

// Firebase core and Auth
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC9NvKS9sWKWYFi-I4mv75I7wlrObb-mjE",
    authDomain: "swim-cut-check.firebaseapp.com",
    projectId: "swim-cut-check",
    storageBucket: "swim-cut-check.firebasestorage.app",
    messagingSenderId: "120625942614",
    appId: "1:120625942614:web:e0932a7699ff882d586bf7",
    measurementId: "G-S1S5MTQEC9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth
export const auth = getAuth(app);

export { app };