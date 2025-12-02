import { loadHeaderFooter } from "./functions.mjs";
import { observeUser, logoutUser } from "./auth.js";
import SwimmerProfiles from "./build-profiles.mjs";

//Call function to load headers and footers
loadHeaderFooter();


//Account Section:
const logoutButton = document.querySelector('#logout-button');
const emailDisplay = document.querySelector('#user-email');

//If user logs out or is not logged in, redirect to login page
observeUser((user) => { //user is a value given by firebase, the user if they are logged in, null if they are not; it is the parameter of the callback function
    if (!user) {
        window.location.href = "index.html";
    } else {
        emailDisplay.textCOntent = `Account E-mail: ${user.email}`;
    }
});

//Add event listener for logout button
logoutButton.addEventListener("click", async () => { //async because of firebase
    await logoutUser();
});


//Create a new instance of SwimmerProfiles
const newSwimmerProfiles = new SwimmerProfiles();
newSwimmerProfiles.init();

//Show/Hide New Swimmer Form
document.getElementById('.add-swimmer').addEventListener('click', () => {
    document.querySelector('.new-swimmer-form').classList.toggle('hide');
});

//Submit New Swimmer Profile button on form
document.getElementById('new-swimmer-submit').addEventListener('click', (event) => {
    event.preventDefault();
    const form = document.querySelector('.new-swimmer-form');
    newSwimmerProfiles.addSwimmerToAccount(form);
});