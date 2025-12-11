import { loadHeaderFooter } from "./functions.mjs";
import { registerUser, observeUserLoginChanges } from "./auth.js";

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

//Get form and message from register.html
const registrationForm = document.querySelector('#registration');
const registrationErrorMessage = document.querySelector('#registration-message');

//Add event listener to submit button
//must be async because it needs to "await" Firebase's asynchronous calls
document.querySelector("#registration-submit").addEventListener("click", async (event) => { 
    event.preventDefault(); //prevents page refresh
    
    //Get email and password from the form
    const email = registrationForm.email.value;
    const password = registrationForm.password.value;

    try {
        //enter email and password into function registerUser
        await registerUser(email, password);
        //Redirect to user swimmer profiles page if registration is successful
        window.location.href = "swimmer-profiles.html"
    } catch (err) {
        //Display error message if registration is not successful
        registrationErrorMessage.textContent = `Something went wrong. Please try again.`;
        console.log(err.message);
    }  
});