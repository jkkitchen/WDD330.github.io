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
    const lcDate = document.createElement('p');
    lcDate.classList.add('date-p');

    //Display content
    scDate.textContent = `Short Course: ${dates.shortCourse}`;
    lcDate.textContent = `Long Course: ${dates.longCourse}`;

    //Append to div
    datesDiv.appendChild(scDate);
    datesDiv.appendChild(lcDate);
}