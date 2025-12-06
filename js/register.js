import { loadHeaderFooter } from "./functions.mjs";
import { registerUser } from "./auth.js";

//Call function to load headers and footers
loadHeaderFooter();


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
        registrationErrorMessage.textContent = err.message;
    }  
});