import { getAuth } from "firebase/auth";

export default class MockAPIData {
    //CONSTRUCTOR:
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    //METHODS:
    //Method to pull swimmer data from MockAPI
    async getSwimmers() {
        const auth = getAuth(); //Need this to pull user info from Firebase
        const user = auth.currentUser;

        //Use if statement to ensure user exists in the Firebase system
        if (!user) return [];

        const response = await fetch(`${this.baseURL}?userID=${user.email}`);
        return await response.json(); //use second await statement to ensure the data is returned rather than the promise
    }

    //Method to add swimmer to MockAPI
    async addSwimmer(swimmer) {
        const auth = getAuth();
        const user = auth.currentUser;

        //Use if statement to ensure user is logged in
        if (!user) throw new Error("Not Logged In");

        //save swimmer to user id
        swimmer.userId = user.email;

        const response = await fetch(this.baseURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(swimmer)
        });
        return await response.json();
    }

}