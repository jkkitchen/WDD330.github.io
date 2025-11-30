import { getLocalStorage, setLocalStorage } from "./functions.mjs";

export default class SwimmerProfiles {
    //Constructor
    constructor(swimmerId, dataSource) {
        this.swimmerId = swimmerId;
        this.swimmers = {};
        this.dataSource = dataSource;
    }


    //Methods
    async init() {
        this.swimmers = await this.dataSource.findSwimmerById(this.swimmerId);
        this.renderSwimmerProfile();
        document
            .getElementById('addSwimmer')
            .addEventListener('click', this.addSwimmerToAccount.bind(this));
    }


    addSwimmertoAccount() {
        const swimmers = getLocalStorage("swimmerData") || [];

        //Check to see if swimmer already exists in this account
        const existingSwimmer = swimmers.find(item => item.Id === this.swimmer.Id);

        //If swimmer already exists, do nothing, otherwise add swimmer to the account
        if (existingSwimmer) {
            return;
        } else {
            swimmers.push(this.swimmer);
        }

        //Save swimmer to account
        setLocalStorage("swimmerData", swimmers);

        //Refresh the page so the new profile will show
        location.reload();
    }

    renderSwimmerProfile() {
        swimmerProfileTemplate(this.swimmer);
    }
}

//Global Functions
function swimmerProfileTemplate(swimmer) {
    
}