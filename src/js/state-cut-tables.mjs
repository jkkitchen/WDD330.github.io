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
        const swimmerResults = await this.swimmerDataSource.getSwimmers();
        const datesResults = await this.datesdataSource.getDates()

        //Set local values
        this.swimmers = swimmerResults;
        this.dates = datesResults;

        //Call function to render swimmer info and table with times
        renderSwimmerTable();
    }


}

//GLOBAL FUNCTIONS
function swimmerCutTable(swimmer, dates) {
    //Create div to hold info on swimmer and the table
    const swimmerDiv = document.createElement('div');
    swimmerDiv.classList.add('swimmer-div');

    //Create elements to go in the div
    const swimmerName = document.createElement('h2');
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
    const scAge = Math.floor((new Date(dates.shortCourse) - new Date(swimmer.birthdate)) / (1000 * 60 * 60 * 24 * 365));
    const lcAge = Math.floor((new Date(dates.longCourse) - new Date(swimmer.birthdate)) / (1000 * 60 * 60 * 24 * 365))
    
    //Figure out competition group for state meets based on age.
    let compGroupSC;
    if (scAge <= 10) {
        compGroupSC = '10&U';
    } else if (scAge === 11 || scAge === 12) {
        compGroupSC = '11&12';
    } else if (scAge === 13 || scAge === 14) {
        compGroupSC = '13&14';
    } else {
        compGroupSC = '15&O';
    }

    let compGroupLC;
    if (lcAge <= 10) {
        compGroupLC = '10&U';        
    } else if (lcAge === 11 || lcAge === 12) {
        compGroupLC = '11&12';
    } else if (lcAge === 13 || lcAge === 14) {
        compGroupLC = '13&14';
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