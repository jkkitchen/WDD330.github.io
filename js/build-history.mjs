import { getLocalStorage } from "./functions.mjs";

export default class SwimmerHistory {
    //CONSTRUCTOR
    constructor() {
        this.dataSource = dataSource; //dataSource will be Local Storage
        this.swimmerId = swimmerId; //key
        this.eventTimesHistory = []; //data
    }

    //METHODS
    async init() {
        //Get swimmer history keys from localStorage using Object.keys(obj), a built in JS method
        const swimmerKeys = Object.keys(localStorage).filter(key => key.startsWith('swimmer_') && key.endsWith('_history'));

        //Loop through localStorage and create an array for each swimmer using the swimmerKeys
        const historyArray = swimmerKeys.map(key => getLocalStorage(key));

        
    }
}

//GLOBAL FUNCTIONS

//Function to build table of times
function buildHistoryTable(swimmerHistoryArray, container) {
    //Get information needed from the array
    const eventsGrouped = {}
    swimmerHistoryArray.forEach(entry => {
        const timestamp = entry.timestamp;
        const swimmerName = entry.timestamp;

        //Create an object where the key is the event name and the value is the time
        for (const [event, time] of Object.entries(entry.eventTimes)) {
            if (!eventsGrouped[event]) {
                eventsGrouped[event] = []; //Creates an empty array if this event hasn't been used yet
            }

            //Add the time and timestamp to the array for this event
            eventsGrouped[event].push({
                time: time,
                timestamp: entry.timestamp
            });
        }
    });
    
    //Get element from html
    const container = document.querySelector('#history-tables');

}