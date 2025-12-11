import { loadHeaderFooter, getLocalStorage } from "./functions.mjs";
import { observeUserLoginChanges } from "./auth.js";
import { lastVisitMessage } from "./last-visit.mjs";
import SwimmerProfiles from "./build-profiles.mjs";
import MockAPIData from "./mockAPI.mjs";

//Call function to load headers and footers
loadHeaderFooter();

//Get current user from local storage to be used in functions below
const currentUser = getLocalStorage('currentUser');

//Create an event listener so the last visit message will display when the page loads
document.addEventListener("DOMContentLoaded", lastVisitMessage);

//Create a new instance of MockAPIData
//API ENDPOINT FROM MOCKAPI:
const swimmersAPIendpoint = `https://692f280e91e00bafccd6c5d3.mockapi.io/swim-cut-check/swimmers`;

//Datasource for SwimmerProfiles
const swimmerData = new MockAPIData(swimmersAPIendpoint);

//Create a new instance of SwimmerProfiles
const newSwimmerProfiles = new SwimmerProfiles(swimmerData);

//Account Section:
const emailDisplay = document.querySelector('#user-email');

//If user logs out or is not logged in, redirect to login page
observeUserLoginChanges((user) => { //user is a value given by firebase, the user if they are logged in, null if they are not; it is the parameter of the callback function
    if (!user) {
        window.location.href = "index.html";
        return;
    } else {
        emailDisplay.textContent = `Account E-mail: ${user.email}`;
    }

    //Load swimmers now that we know the user
    newSwimmerProfiles.init();    
});


//Add event listeners for the update and delete buttons associated with the profiles
document.getElementById('template-swimmer').addEventListener("click", async (e) => {
    //Delete Swimmer Button clicked:
    if (e.target.classList.contains('delete-swimmer-button')) {
        const swimmerId = e.target.dataset.id;        
        try {
            await fetch(`${swimmerData.baseURL}/${swimmerId}`,
                { method: "DELETE" });
            //Remove the deleted swimmer
            newSwimmerProfiles.swimmers = newSwimmerProfiles.swimmers.filter(s => s.id !== swimmerId);

            //Remove the deleted swimmer from localStorage for swimmer-history.html
            localStorage.removeItem(`${currentUser}_swimmer_${swimmerId}_history`);

            //Render the profiles without the deleted one
            newSwimmerProfiles.renderAllSwimmerProfiles();
        } catch (err) {
            console.error("Failed to delete swimmer: ", err);
        }
    }

    //Update Swimmer Button clicked:
    if (e.target.classList.contains('update-swimmer-button')) {
        const swimmerId = e.target.dataset.id;
        const swimmer = newSwimmerProfiles.swimmers.find(s => s.id === swimmerId);
        if (swimmer) {
            //Populate new swimmer form with swimmer data so user can edit
            newSwimmerProfiles.updateSwimmerForm(swimmer);
            //Define a editingSwimmerId to show that this is an update rather than new swimmer in saveSwimmer function
            newSwimmerProfiles.editingSwimmerId = swimmerId;
            //Scroll down to form so user can see the loaded data
            document.querySelector('.new-swimmer-form').scrollIntoView({ behavior: 'smooth' });
        }
    }
});


//Show/Hide New Swimmer Form
document.getElementById('add-swimmer').addEventListener('click', () => {
    document.querySelector('.new-swimmer-form').classList.toggle('hide');
    document.querySelector('.new-swimmer-form').scrollIntoView({ behavior: 'smooth' });
});

//Submit button on New Swimmer form (also button to submit changes when made to existing profiles)
document.getElementById('new-swimmer-submit').addEventListener('click', async (event) => { //make async to make sure the swimmer is added to MockAPI before form resets
    event.preventDefault();
    const form = document.querySelector('.new-swimmer-form');

    //Check if inputs are valid before submitting form
    const invalidMessage = document.querySelector('#swimmer-form-message');
    if (!form.checkValidity()) {        
        invalidMessage.textContent = "Values input are incorrect. Please fix and submit again."
        return;
    }

    //Saves info input in form to MockAPI
    const savedSwimmer = await newSwimmerProfiles.saveSwimmerProfile(form);

    //Call function to save event time information to LocalStorage to be called on swimmer-history.html
    newSwimmerProfiles.recordTimesToLocalStorage(savedSwimmer.id);

    //Reset and hide form    
    form.reset();
    form.classList.add('hide'); //Hides the form again since toggling removed the 'hide' class

    //Hide message about errors submitting form if needed
    invalidMessage.classList.add('hide');
});