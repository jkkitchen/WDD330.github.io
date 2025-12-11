import { loadHeaderFooter, setLocalStorage } from "./functions.mjs";
import { userLogin, observeUserLoginChanges } from "./auth.js";

//Call function to load headers and footers
loadHeaderFooter();

//Determine if user is logged in, if not logged in do not show nav menu
observeUserLoginChanges((user) => { //user is a value given by firebase, the user if they are logged in, null if they are not; it is the parameter of the callback function
    const nav = document.querySelector('.nav');
    if (!user) {        
        nav.classList.add('hide');
    } else {
        nav.classList.remove('hide');
    }
});


//LOGIN SECTION:
//Get elements from index.html
const loginForm = document.querySelector('#login-form');
const loginMessage = document.querySelector('#login-message');

//Add Event Listener
//must be async because it needs to "await" Firebase's asynchronous calls
document.querySelector("#login-submit").addEventListener("click", async (event) => { 
    event.preventDefault(); //prevents page refresh
    
    //Get email and password from the form
    const email = loginForm.email.value;
    const password = loginForm.password.value;

    try {
        //enter email and password into function userLogin
        await userLogin(email, password);

        //Save user email in local storage to be used as part of the key for storing swimmer info later
        setLocalStorage('currentUser', email);

        //Redirect to user swimmer profiles page if login is successful
        window.location.href = "swimmer-profiles.html"
    } catch (err) {
        //Display error message if login is not successful
        loginMessage.textContent = `Something went wrong. Please try again.`;
        console.log(err.message);
    }  
});
