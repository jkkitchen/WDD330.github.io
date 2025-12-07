import StateCuts from '../data/StateCuts.js';

export default class StateCutTables {
    //CONSTRUCTOR
    constructor(swimmerDataSource, datesDataSource) {
        this.swimmersData = swimmerDataSource;
        this.datesData = datesDataSource;
        this.swimmers = null;
        this.dates = null;
    }

    //METHODS
    async init() {       
        //Call MockAPI functions to get data from MockAPI
        const swimmerResults = await this.swimmersData.getSwimmers();
        const datesResults = await this.datesData.getDates();

        //Set local values
        this.swimmers = swimmerResults;
        this.dates = datesResults;

        //Call function to render swimmer info and table with times
        this.renderSwimmerTable();
    }

    async renderSwimmerTable() {
        this.swimmers.forEach(swimmer => {
            swimmerCutTable(swimmer, this.dates);
        })        
    }

}

//GLOBAL FUNCTIONS
function swimmerCutTable(swimmer, dates) {
    //Create div to hold info on swimmer and the table
    const swimmerDiv = document.createElement('div');
    swimmerDiv.classList.add('swimmer-div');

    //Create elements to go in the div
    const swimmerName = document.createElement('h3');
    const swimmerBirthdate = document.createElement('p');
    const swimmerAgeSC = document.createElement('p');
    const swimmerCompGroupSC = document.createElement('p'); 
    const swimmerAgeLC = document.createElement('p');
    const swimmerCompGroupLC = document.createElement('p');
    const scTable = document.createElement('table');
    scTable.classList.add('sc-state-table');
    const lcTable = document.createElement('table');
    lcTable.classList.add('lc-state-table');

    //Calculate ages at time of state meet:
    const { shortCourse, longCourse } = dates[0];
    const scAge = Math.floor((new Date(shortCourse) - new Date(swimmer.birthdate)) / (1000 * 60 * 60 * 24 * 365));
    const lcAge = Math.floor((new Date(longCourse) - new Date(swimmer.birthdate)) / (1000 * 60 * 60 * 24 * 365))

    //Figure out competition group for state meets based on age.
    let compGroupSC;
    if (scAge <= 10) {
        compGroupSC = '10&U';
    } else if (scAge === 11 || scAge === 12) {
        compGroupSC = '11-12';
    } else if (scAge === 13 || scAge === 14) {
        compGroupSC = '13-14';
    } else {
        compGroupSC = '15&O';
    }

    let compGroupLC;
    if (lcAge <= 10) {
        compGroupLC = '10&U';        
    } else if (lcAge === 11 || lcAge === 12) {
        compGroupLC = '11-12';
    } else if (lcAge === 13 || lcAge === 14) {
        compGroupLC = '13-14';
    } else {
        compGroupLC = '15&O';
    }    

    //Create content for elements
    swimmerName.textContent = `Name: ${swimmer.fname} ${swimmer.lname}`;
    swimmerBirthdate.textContent = `Birthdate: ${swimmer.birthdate}`;
    swimmerAgeSC.textContent = `Age at Time of Short Course State Meet: ${scAge}`;
    swimmerCompGroupSC.textContent = `Competition Category: ${compGroupSC}`;
    swimmerAgeLC.textContent = `Age at Time of Long Course State Meet: ${lcAge}`;
    swimmerCompGroupLC.textContent = `Competition Category: ${compGroupLC}`;

    //Create tables        
    //Table Head (same for short course and long course):
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');    
    //Header Row:
    const thEvent = document.createElement('th');
    thEvent.textContent = 'Event';
    const thSwimmerTime = document.createElement('th');
    thSwimmerTime.textContent = "Swimmer's Time";
    const thStateCutTime = document.createElement('th');
    thStateCutTime.textContent = 'State Qualifying Time';
    const thTimeToCut = document.createElement('th');
    thTimeToCut.textContent = "Swimmer's Time to Cut";    
    //Append to Header Row:
    headerRow.appendChild(thEvent);
    headerRow.appendChild(thSwimmerTime);
    headerRow.appendChild(thStateCutTime);
    headerRow.appendChild(thTimeToCut);
    //Append header row to table head:     
    thead.appendChild(headerRow);
    //Clone the thead so it can be in two places:
    const scthead = thead.cloneNode(true);
    const lcthead = thead.cloneNode(true);
    //Append table heads to tables:
    scTable.appendChild(scthead);
    lcTable.appendChild(lcthead);

    //Pull data from JSON file and put in arrays
    let swimmerGender;
    if (swimmer.gender === "F") {
        swimmerGender = 'Girls';
    } else {
        swimmerGender = 'Boys';
    }    

    const scTimes = Object.keys(StateCuts["Short Course"][swimmerGender][compGroupSC]);
    const lcTimes = Object.keys(StateCuts["Long Course"][swimmerGender][compGroupLC]);

    //SC TABLE
    //Table Body:
    const sctbody = document.createElement('tbody');
    //Loop through events to create rows
    scTimes.forEach(event => {
        //Create row to hold data
        const row = document.createElement('tr');
        row.classList.add('table-row');

        //Fill row with data
        const tdEvent = document.createElement('td');
        tdEvent.textContent = event;

        const tdSwimmerTime = document.createElement('td');
        tdSwimmerTime.textContent = swimmer[event] || '';

        const tdStateCut = document.createElement('td');
        tdStateCut.textContent = StateCuts["Short Course"][swimmerGender][compGroupSC][event];

        const tdTimeToCut = document.createElement('td');
        //Calculate difference in swimmer's time and state cut
        const swimmerTime = turnStringToTime(swimmer[event]);
        const stateCutTime = turnStringToTime(StateCuts["Short Course"][swimmerGender][compGroupSC][event]);
        let formattedTimeToCut; //Set variable to hold string version of the calculation
        if (!swimmerTime) { //if there is no time for either swimmer time or state cut time
            row.classList.add('no-time');
            formattedTimeToCut = '';
        } else if (swimmerTime > stateCutTime) {
            const timeToCut = swimmerTime - stateCutTime;
            row.classList.add('not-qualified');
            formattedTimeToCut = turnTimeToString(timeToCut);
        } else if (swimmerTime <= stateCutTime) {
            row.classList.add('qualified');
            formattedTimeToCut = 'Qualified';
        };
        tdTimeToCut.textContent = formattedTimeToCut;

        //Append data to row
        row.appendChild(tdEvent);
        row.appendChild(tdSwimmerTime);
        row.appendChild(tdStateCut);
        row.appendChild(tdTimeToCut);

        //Append row to tbody
        sctbody.appendChild(row);
    });

    //Append body to table
    scTable.appendChild(sctbody);


    //LC TABLE
    //Table Body:
    const lctbody = document.createElement('tbody');
    //Loop through events to create rows
    lcTimes.forEach(event => {
        //Create row to hold data
        const row = document.createElement('tr');
        row.classList.add('table-row');

        //Fill row with data
        const tdEvent = document.createElement('td');
        tdEvent.textContent = event;

        const tdSwimmerTime = document.createElement('td');
        tdSwimmerTime.textContent = swimmer[event] || '';

        const tdStateCut = document.createElement('td');
        tdStateCut.textContent = StateCuts["Long Course"][swimmerGender][compGroupLC][event];

        const tdTimeToCut = document.createElement('td');
        //Calculate difference in swimmer's time and state cut
        const swimmerTime = turnStringToTime(swimmer[event]);
        const stateCutTime = turnStringToTime(StateCuts["Long Course"][swimmerGender][compGroupLC][event]);
        let formattedTimeToCut; //Set variable to hold string version of the calculation
        if (!swimmerTime) { //if there is no time for either swimmer time or state cut time
            row.classList.add('no-time');
            formattedTimeToCut = '';
        } else if (swimmerTime > stateCutTime) {
            const timeToCut = swimmerTime - stateCutTime;
            row.classList.add('not-qualified');
            formattedTimeToCut = turnTimeToString(timeToCut);
        } else if (swimmerTime <= stateCutTime) {
            row.classList.add('qualified');
            formattedTimeToCut = 'Qualified';
        };
        tdTimeToCut.textContent = formattedTimeToCut;

        //Append data to row
        row.appendChild(tdEvent);
        row.appendChild(tdSwimmerTime);
        row.appendChild(tdStateCut);
        row.appendChild(tdTimeToCut);

        //Append row to tbody
        lctbody.appendChild(row);
    });
    
    //Append body to table
    lcTable.appendChild(lctbody);

    //Append content to div
    swimmerDiv.appendChild(swimmerName);
    swimmerDiv.appendChild(swimmerBirthdate);
    swimmerDiv.appendChild(swimmerAgeSC);
    swimmerDiv.appendChild(swimmerCompGroupSC);
    swimmerDiv.appendChild(scTable);
    swimmerDiv.appendChild(swimmerAgeLC);
    swimmerDiv.appendChild(swimmerCompGroupLC);
    swimmerDiv.appendChild(lcTable);

    //Append div to state-cuts.html
    const stateCutsDiv = document.querySelector('#swimmer-cut-times');
    stateCutsDiv.appendChild(swimmerDiv);
}

//Function to convert times recorded as strings as a time in seconds
function turnStringToTime(string) {
    let time;
    if (string === 'n/a' || !string) { //if there is no time, return null value
        time = null;        
    } else {
        const parts = string.split(':'); //splits minutes and seconds apart
        time = parseInt(parts[0]) * 60 + parseFloat(parts[1]);
    }
    return time;
}

//Function to convert time in seconds to a string in MM:SS.xx format
function turnTimeToString(timeInSeconds) {
    const minutes = String(Math.floor(timeInSeconds / 60));
    const seconds = (timeInSeconds % 60).toFixed(2); //ensures only 2 decimal places, toFixed converts it to a string

    //Add leading zero on minutes if it's less than 10
    const paddedMinutes = minutes.padStart(2, '0');

    //Add leading zero on seconds if it's less than 10
    const secondsParts = seconds.split('.'); //Split into parts before and after the decimal point.
    const wholeSeconds = secondsParts[0];
    const paddedSeconds = `${wholeSeconds.padStart(2, '0')}.${secondsParts[1]}`; //padStart is a build in JS function that adds a value in front

    const formattedTime = `${paddedMinutes}:${paddedSeconds}`;
    return formattedTime;
}