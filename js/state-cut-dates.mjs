import { getLocalStorage, setLocalStorage } from "./functions.mjs";

export default class StateCutDates {
    //CONSTRUCTOR
    constructor(dataSource) {
        this.dataSource = dataSource; //dataSource will be MockAPI
        this.dates = null;        
    }

    //METHODS
    async init() {
        const results = await this.dataSource.getDates();        
        //Get form from state-cuts.html        
        const form = document.querySelector('#state-dates-form');
        //Set this.dates value based on whether there is anything in dataSource (any dates are saved)     
        if (results.length > 0) {
            this.dates = results[0];
            //Hide the form since there are existing dates
            form.classList.add('hide');
            //Call function to display the dates
            this.renderDates();
        } else {
            this.dates = null;
            //Show the form so dates can be entered
            form.classList.remove('hide');
        }
    }

    async renderDates() {
        displayDates(this.dates);       
    }
    
    async saveDates() {
        //Get form from html
        const form = document.querySelector('#state-dates-form');
        //Get values from form, these are the values I assigned on MockAPI
        const shortCourse = form.querySelector('#short-course-date').value;
        const longCourse = form.querySelector('#long-course-date').value;
        //Create object containing the values
        const datesObject = { shortCourse, longCourse };

        //Save values to localStorage
        setLocalStorage('shortCourseDate', shortCourse);
        setLocalStorage('longCourseDate', longCourse);

        //Update MockAPI
        let savedDates;
        if (this.dates) {
            //Udpate existing record
            savedDates = await this.dataSource.updateDates(this.dates.id, datesObject);
        } else {
            //Create new record
            savedDates = await this.dataSource.addDates(datesObject);
        }        

        //Update local value
        this.dates = savedDates; //Now contains id assigned by MockAPI as well
    }

    //Function to pull localStorage values to populate the form when it shows
    async populateDatesForm() {
        //Get input elements from html
        const form = document.querySelector('#state-dates-form');
        const shortCourse = form.querySelector('#short-course-date');
        const longCourse = form.querySelector('#long-course-date');

        //Call saved values from localStorage
        const savedSCDate = getLocalStorage('shortCourseDate');
        const savedLCDate = getLocalStorage('longCourseDate');

        //Check to see if there are any values in localStorage, if not, return (default value of today's date will load)
        if (!savedSCDate && !savedLCDate) return;

        //If values exist, populate form with saved values
        if (savedSCDate) shortCourse.value = savedSCDate;
        if (savedLCDate) longCourse.value = savedLCDate;
    }

}

//GLOBAL FUNCTIONS
function displayDates(dates) {
    //Get div from html
    const datesDiv = document.querySelector('#existing-state-dates');

    //Clear div so dates are not shown more than once
    datesDiv.innerHTML = "";

    //Create new values to be added to div
    const scDate = document.createElement('p');
    scDate.classList.add('date-p');
    scDate.classList.add('sc-date');
    const lcDate = document.createElement('p');
    lcDate.classList.add('date-p');
    lcDate.classList.add('lc-date');

    //Display content
    scDate.textContent = `Short Course: ${dates.shortCourse}`;
    lcDate.textContent = `Long Course: ${dates.longCourse}`;

    //Append to div
    datesDiv.appendChild(scDate);
    datesDiv.appendChild(lcDate);
}