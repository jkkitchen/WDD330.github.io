import { loadHeaderFooter } from "./functions.mjs";
import { observeUserLoginChanges } from "./auth.js";
import MockAPIData from "./mockAPI.mjs";
import StateCutDates from "./state-cut-dates.mjs";
import StateCutTables from "./state-cut-tables.mjs";

//Call function to load headers and footers
loadHeaderFooter();


//Create a new instance of MockAPIData
//API ENDPOINTS FROM MOCKAPI:
const stateDatesAPIendpoint = `https://692f280e91e00bafccd6c5d3.mockapi.io/swim-cut-check/state-dates`;
const swimmersAPIendpoint = `https://692f280e91e00bafccd6c5d3.mockapi.io/swim-cut-check/swimmers`;
//State Meets Dates and Swimmers Data
const savedStateDates = new MockAPIData(stateDatesAPIendpoint);
const swimmersData = new MockAPIData(swimmersAPIendpoint);


//Create a new instance of StateCutDates
const stateCutDates = new StateCutDates(savedStateDates);

//Create a new instance of StateCutTables
const stateCutTable = new StateCutTables(swimmersData, savedStateDates);

//Wait for login state to load before loading dates
observeUserLoginChanges(async user => {
    if (user) {                
        await stateCutDates.init();

        //Check to see if there are dates saved on MockAPI, if there are run stateCutTable.init()
        const results = await savedStateDates.getDates();        
        if (results.length > 0) {
            stateCutTable.init();            
        } //if there are not dates on API, stateCutTable.init() is run in event listener for dates form
    }
});

//Create an event listener for submit dates button
document.querySelector('#state-dates-submit').addEventListener("click", async (e) => {
    e.preventDefault();    
    //Save the new dates
    await stateCutDates.saveDates();
    //Re-render to show the saved dates and hide the form
    stateCutDates.renderDates();
    document.querySelector('#state-dates-form').classList.add('hide');
    //Clear Form
    const form = document.querySelector('#state-dates-form');
    form.reset();

    //Create the state cut tables with new dates
    stateCutTable.init();
})

//Create an event listener for update dates button
document.querySelector('#update-dates-button').addEventListener("click", async (e) => {
    document.querySelector('#state-dates-form').classList.remove('hide');
    stateCutDates.populateDatesForm();
})