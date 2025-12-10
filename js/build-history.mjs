import { getLocalStorage } from "./functions.mjs";

export default class SwimmerHistory {
    //CONSTRUCTOR -- not needed because everything is pulled from localStorage


    //METHODS -- don't need to be async becuase using localStorage
    init() {
        //Get swimmer history keys from localStorage using Object.keys(obj), a built in JS method
        const swimmerKeys = Object.keys(localStorage).filter(key => key.startsWith('swimmer_') && key.endsWith('_history'));

        //Build tables
        this.renderTables(swimmerKeys);        
    }

    renderTables(keysArray) {        
        //Build an array for each swimmer
        const historyArray = keysArray.map(key => getLocalStorage(key));
        //Call function to build table for each swimmer
        historyArray.forEach(swimmerHistory => {
            buildHistoryTable(swimmerHistory);
        });       
    }
}

//GLOBAL FUNCTIONS

//Function to build table of times
function buildHistoryTable(swimmerHistoryArray) {
    //Get element from html
    const container = document.querySelector('#history-tables');
   
    //Get information needed from the array
    if (!swimmerHistoryArray || swimmerHistoryArray.length === 0) return; //in case swimmer has no entries
    const swimmerName = swimmerHistoryArray[0].swimmerName; //pulls from the first object in the array, since each object in the array is for the same swimmer this is fine
    const eventsGrouped = {}
    swimmerHistoryArray.forEach(entry => {        
        const timestamp = entry.timestamp;        
        //Create an object where the key is the event name and the value is the time
        for (const [event, time] of Object.entries(entry.eventTimes)) {
            if (!eventsGrouped[event]) {
                eventsGrouped[event] = []; //Creates an empty array if this event hasn't been used yet
            }
            //Add the time and timestamp to the array for this event
            eventsGrouped[event].push({
                time: time,
                timestamp: timestamp
            });
        }
    })

    //Create div for each swimmer
    const swimmerHistoryDiv = document.createElement('div');
    swimmerHistoryDiv.classList.add('swimmer-history-div');

    //Create header to add to div
    const header = document.createElement('h3');
    header.textContent = swimmerName;
    swimmerHistoryDiv.appendChild(header);

    //TABLE
    //Create tables and add to div
    const historyTable = document.createElement('table');
    historyTable.classList.add('history-table');

    //Header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    //Header Row:
    const thEvent = document.createElement('th');
    thEvent.textContent = 'Event';
    const thSwimmerTime = document.createElement('th');
    thSwimmerTime.textContent = "Swimmer's Time";        
    const thDate = document.createElement('th');
    thDate.textContent = 'Date of Entry';
    //Append to Header Row:
    headerRow.appendChild(thEvent);
    headerRow.appendChild(thSwimmerTime);        
    headerRow.appendChild(thDate);
    //Append header row to table head:     
    thead.appendChild(headerRow);
    //Append table head to table:
    historyTable.appendChild(thead);        

    //Body
    const tbody = document.createElement('tbody');
    //Loop through events to create rows
    for (const [eventName, timesArray] of Object.entries(eventsGrouped)) {
        //Sort by timestamp, newest to oldest
        timesArray.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        //Create new array that does not have any empty times
        const filteredTimesArray = timesArray.filter(t => t.time && t.time.trim() !== '');
        
        //Fill row with data from filteredTimesArray (event, time, timestamp)
        filteredTimesArray.forEach((t, index) => {
            //Create row
            const row = document.createElement('tr');
            row.classList.add('table-row');

            //Event Name
            const tdEventName = document.createElement('td');
            if (index === 0) {
                tdEventName.textContent = eventName;
                tdEventName.classList.add('has-top-border');
            } else {
                tdEventName.textContent = ''; //blank on all but the first row for each array
                tdEventName.classList.add('no-entry');
            }            

            //Swimmer Times
            const tdSwimmerTime = document.createElement('td');        
            tdSwimmerTime.textContent = t.time;
            tdSwimmerTime.classList.add('has-top-border');

            //Timestamps
            const tdTimestamps = document.createElement('td');
            tdTimestamps.textContent = new Date(t.timestamp).toLocaleDateString();
            tdTimestamps.classList.add('has-top-border');

            //Append data to row
            row.appendChild(tdEventName);
            row.appendChild(tdSwimmerTime);
            row.appendChild(tdTimestamps);

            //Append row to body
            tbody.appendChild(row); 
        }); 
    }  
    //Append body to table
    historyTable.appendChild(tbody);
    //Append table to swimmer div
    swimmerHistoryDiv.appendChild(historyTable);
    //Append swimmer div to container in html
    container.appendChild(swimmerHistoryDiv);
}