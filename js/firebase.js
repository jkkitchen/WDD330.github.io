// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
export const auth = getAuth(app);
export { app };

