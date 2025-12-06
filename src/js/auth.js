//Authentication for Register/Login/Logout

import { auth } from "./firebase.js";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "firebase/auth";

//every auth function requires auth as a parameter so Firebase knows which project this is

//Register Account:
export function registerUser(email, password) {
    return createUserWithEmailAndPassword(auth, email, password); 
}

//Login:
export function userLogin(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
}

//Logout:
export function logoutUser() {
    return signOut(auth);
}

//Auth State Listener (this runs whenever the user's login state changes)
export function observeUserLoginChanges(callback) { //using callback as a parameter means I can set what happens when the user logs in or logs out
    onAuthStateChanged(auth, callback);
}