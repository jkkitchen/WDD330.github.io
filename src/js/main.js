import { loadHeaderFooter } from "./functions.mjs";
import { userLogin } from "./auth.js";

//Call function to load headers and footers
loadHeaderFooter();

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
        //Redirect to user swimmer profiles page if login is successful
        window.location.href = "swimmer-profiles.html"
    } catch (err) {
        //Display error message if login is not successful
        loginMessage.textContent = err.message;
    }  
});
