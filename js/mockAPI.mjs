import { getAuth } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

export default class MockAPIData {
    //CONSTRUCTOR:
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    //METHODS:
    //Method to ensure current user is logged in
    //this allows you to have other functions that call this function choose between throwing an error if the user is not logged in, or just returning a null value.
    getCurrentUser(throwIfMissing = false) { 
        const user = getAuth().currentUser;
        if (!user && throwIfMissing) {
            throw new Error("Not Logged In");
        }
        return user || null;
    }

    //Method to pull swimmer data from MockAPI
    async getSwimmers() {        
        const user = this.getCurrentUser(); //returns null if not logged in

        //Use if statement to ensure user exists in the Firebase system
        if (!user) return [];

        const response = await fetch(`${this.baseURL}?userId=${user.email}`);
        return await response.json(); //use second await statement to ensure the data is returned rather than the promise
    }

    //Method to add swimmer to MockAPI
    async addSwimmer(swimmer) {        
        const user = this.getCurrentUser(true); //will throw an error if not logged in

        //save swimmer to user id
        swimmer.userId = user.email;

        const response = await fetch(this.baseURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(swimmer)
        });
        return await response.json();
    }

    //Method to update swimmer information
    async updateSwimmer(id, swimmer) {
        const user = this.getCurrentUser(true); //will throw an error if not logged in

        //Save swimmer to user id
        swimmer.userId = user.email;

        const response = await fetch(`${this.baseURL}/${id}`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(swimmer)
        });

        return await response.json();
    }

    //Method to pull state meet dates data from MockAPI
    async getDates() {
        const user = this.getCurrentUser(); //returns null if not logged in

        //Use if statement to ensure user exists in the Firebase system
        if (!user) return [];

        const response = await fetch(`${this.baseURL}?userId=${user.email}`);
        return await response.json(); //use second await statement to ensure the data is returned rather than the promise
    }

    //Method to add state meet dates to MockAPI
    async addDates(dates) {
        const user = this.getCurrentUser(true); //will throw an error if not logged in

        //save dates to user id
        dates.userId = user.email;

        const response = await fetch(this.baseURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dates)
        });
        return await response.json();
    }

    //Method to update state meet dates information
    async updateDates(id, dates) {
        const user = this.getCurrentUser(true); //will throw an error if not logged in

        //Save dates to user id
        dates.userId = user.email;

        const response = await fetch(`${this.baseURL}/${id}`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(dates)
        });

        return await response.json();
    }
}