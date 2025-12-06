export default class SwimmerProfiles {
    //CONSTRUCTOR
    constructor(dataSource) {
        this.dataSource = dataSource; //dataSource will be MockAPI
        this.swimmers = []; //swimmers are all saved in the datasource
    }


    //METHODS
    //Load swimmers for the current account
    async init() {
        this.swimmers = await this.dataSource.getSwimmers();
        this.renderAllSwimmerProfiles();
    }

    //Enter saved swimmer information into the new swimmer form to make updates to existing profiles
    async updateSwimmerForm(swimmer) {
        //Select form from swimmer-profiles.html
        const form = document.querySelector('.new-swimmer-form');
        //Remove the hide class
        form.classList.remove('hide');
        //Populate the form with existing values:
        //Swimmer Info:
        document.getElementById('fname').value = swimmer.fname || "";
        document.getElementById("lname").value = swimmer.lname || "";
        document.getElementById("birthdate").value = swimmer.birthdate || "";
        //Short Course (SCY):
        document.getElementById("50FRSCY").value = swimmer["50FRSCY"] || "";
        document.getElementById("100FRSCY").value = swimmer["100FRSCY"] || "";
        document.getElementById("200FRSCY").value = swimmer["200FRSCY"] || "";
        document.getElementById("500FRSCY").value = swimmer["500FRSCY"] || "";
        document.getElementById("1000FRSCY").value = swimmer["1000FRSCY"] || "";
        document.getElementById("1650FRSCY").value = swimmer["1650FRSCY"] || "";
        document.getElementById("50BKSCY").value = swimmer["50BKSCY"] || "";
        document.getElementById("100BKSCY").value = swimmer["100BKSCY"] || "";
        document.getElementById("200BKSCY").value = swimmer["200BKSCY"] || "";
        document.getElementById("50BRSCY").value = swimmer["50BRSCY"] || "";
        document.getElementById("100BRSCY").value = swimmer["100BRSCY"] || "";
        document.getElementById("200BRSCY").value = swimmer["200BRSCY"] || "";
        document.getElementById("50FLSCY").value = swimmer["50FLSCY"] || "";
        document.getElementById("100FLSCY").value = swimmer["100FLSCY"] || "";
        document.getElementById("200FLSCY").value = swimmer["200FLSCY"] || "";
        document.getElementById("100IMSCY").value = swimmer["100IMSCY"] || "";
        document.getElementById("200IMSCY").value = swimmer["200IMSCY"] || "";
        document.getElementById("400IMSCY").value = swimmer["400IMSCY"] || "";
        //Long Course (LCM):
        document.getElementById("50FRLCM").value = swimmer["50FRLCM"] || "";
        document.getElementById("100FRLCM").value = swimmer["100FRLCM"] || "";
        document.getElementById("200FRLCM").value = swimmer["200FRLCM"] || "";
        document.getElementById("400FRLCM").value = swimmer["400FRLCM"] || "";
        document.getElementById("800FRLCM").value = swimmer["800FRLCM"] || "";
        document.getElementById("1500FRLCM").value = swimmer["1500FRLCM"] || "";
        document.getElementById("50BKLCM").value = swimmer["50BKLCM"] || "";
        document.getElementById("100BKLCM").value = swimmer["100BKLCM"] || "";
        document.getElementById("200BKLCM").value = swimmer["200BKLCM"] || "";
        document.getElementById("50BRLCM").value = swimmer["50BRLCM"] || "";
        document.getElementById("100BRLCM").value = swimmer["100BRLCM"] || "";
        document.getElementById("200BRLCM").value = swimmer["200BRLCM"] || "";
        document.getElementById("50FLLCM").value = swimmer["50FLLCM"] || "";
        document.getElementById("100FLLCM").value = swimmer["100FLLCM"] || "";
        document.getElementById("200FLLCM").value = swimmer["200FLLCM"] || "";
        document.getElementById("100IMLCM").value = swimmer["100IMLCM"] || "";
        document.getElementById("200IMLCM").value = swimmer["200IMLCM"] || "";
        document.getElementById("400IMLCM").value = swimmer["400IMLCM"] || "";
    }


    //Method to pull information from the form to add new swimmer and to update existing swimmer profiles
    async saveSwimmerProfile(form) {
        //Pull form data from form        
        const formData = new FormData(form);
        const swimmerProfile = Object.fromEntries(formData.entries());

        //Use if statement to determine if there is an editingSwimmerId, to determine if this is an update or new swimmer
        if (this.editingSwimmerId) {
            //Update existing swimmer information
            swimmerProfile.id = this.editingSwimmerId;
            await this.dataSource.updateSwimmer(this.editingSwimmerId, swimmerProfile);            

            //Reload page to display updated profiles
            await this.init();

            //Reset editingSwimmerId to null now that edits are complete
            this.editingSwimmerId = null;
        } else {
            //Add new swimmer information
            //Create an id using the date in ms plus a random time to ensure it's unique
            swimmerProfile.id = Date.now().toString() + Math.floor(Math.random() * 1000);

            //Call the dataSource to save to MockAPI
            const newSwimmer = await this.dataSource.addSwimmer(swimmerProfile);
            this.swimmers.push(newSwimmer);

            //Display the new profile
            this.renderSwimmerProfile(newSwimmer);
        }        

        //Reset and hide form
        form.reset();
        form.classList.add('hide'); //Hides the form again since toggling removed the 'hide' class
    }

    //Render one swimmer profile
    renderSwimmerProfile(swimmer) {
        //Get div where profiles will be displayed
        const container = document.getElementById('template-swimmer');
        //Build swimmer profile
        const profile = swimmerProfileTemplate(swimmer);
        //Append swimmer profile to original div
        container.appendChild(profile);
    }

    //Render all swimmer profiles
    renderAllSwimmerProfiles() {
        //Get div where profiles will be displayed
        const container = document.getElementById('template-swimmer');
        //Clear previous profiles so they're not rendered more than once
        container.innerHTML = "";
        //Run a for loop to create a profile for each swimmer
        this.swimmers.forEach(swimmer => this.renderSwimmerProfile(swimmer));
    }
}

//GLOBAL FUNCTIONS:
function swimmerProfileTemplate(swimmer) {
    //Create new div to hold profile
    const profileDiv = document.createElement('div');
    profileDiv.classList.add('swimmer-profile');

    //Calculate swimmer's age
    const today = new Date();
    const birthdate = new Date(swimmer.birthdate);
    const msInYear = 1000 * 60 * 60 * 24 * 365.2425;  //The .2425 accounts for leap years
    let age = Math.floor((today - birthdate) / msInYear);    

    //Create update button to be part of the div
    const updateButton = document.createElement('button');
    updateButton.textContent = "Update Swimmer";
    updateButton.classList.add('update-swimmer-button');
    updateButton.dataset.id = swimmer.id; //this way this particular update button is only associated with one swimmer

    //Create delete button to be part of the div
    const deleteButton = document.createElement('button');
    deleteButton.textContent = "Delete Swimmer";
    deleteButton.classList.add('delete-swimmer-button');
    deleteButton.dataset.id = swimmer.id //this way this particular delete button is only associated with one swimmer

    //Create div to hold buttons and append buttons to div
    const swimmerProfileButtonsDiv = document.createElement('div');
    swimmerProfileButtonsDiv.classList.add('swimmer-profile-buttons');
    swimmerProfileButtonsDiv.appendChild(updateButton);
    swimmerProfileButtonsDiv.appendChild(deleteButton);


    //Enter info into template
    profileDiv.innerHTML = `
        <h3>Name: ${swimmer.fname} ${swimmer.lname}</h3>
        <h3>Age: ${age}</h3>
        <h3>Birthdate: ${swimmer.birthdate}</h3>
        <h3>Short Course Times: </h3>
        <ul id="short-course-times">
            <li class="times">50 FR SCY: ${swimmer['50FRSCY'] || ''}</li>
            <li class="times">100 FR SCY: ${swimmer['100FRSCY'] || ''}</li>
            <li class="times">200 FR SCY: ${swimmer['200FRSCY'] || ''}</li>
            <li class="times">500 FR SCY: ${swimmer['500FRSCY'] || ''}</li>
            <li class="times">1000 FR SCY: ${swimmer['1000FRSCY'] || ''}</li>
            <li class="times">1650 FR SCY: ${swimmer['1650FRSCY'] || ''}</li>
            <li class="times">50 BK SCY: ${swimmer['50BKSCY'] || ''}</li>
            <li class="times">100 BK SCY: ${swimmer['100BKSCY'] || ''}</li>
            <li class="times">200 BK SCY: ${swimmer['200BKSCY'] || ''}</li>
            <li class="times">50 BR SCY: ${swimmer['50BRSCY'] || ''}</li>
            <li class="times">100 BR SCY: ${swimmer['100BRSCY'] || ''}</li>
            <li class="times">200 BR SCY: ${swimmer['200BRSCY'] || ''}</li>
            <li class="times">50 FL SCY: ${swimmer['50FLSCY'] || ''}</li>
            <li class="times">100 FL SCY: ${swimmer['100FLSCY'] || ''}</li>
            <li class="times">200 FL SCY: ${swimmer['200FLSCY'] || ''}</li>
            <li class="times">100 IM SCY: ${swimmer['100IMSCY'] || ''}</li>
            <li class="times">200 IM SCY: ${swimmer['200IMSCY'] || ''}</li>
            <li class="times">400 IM SCY: ${swimmer['400IMSCY'] || ''}</li>
        </ul>
        <h3>Long Course Times: </h3>
        <ul id="long-course-times">
            <li class="times">50 FR LCM: ${swimmer['50FRLCM'] || ''}</li>
            <li class="times">100 FR LCM: ${swimmer['100FRLCM'] || ''}</li>
            <li class="times">200 FR LCM: ${swimmer['200FRLCM'] || ''}</li>
            <li class="times">400 FR LCM: ${swimmer['400FRLCM'] || ''}</li>
            <li class="times">800 FR LCM: ${swimmer['800FRLCM'] || ''}</li>
            <li class="times">1500 FR LCM: ${swimmer['1500FRLCM'] || ''}</li>
            <li class="times">50 BK LCM: ${swimmer['50BKLCM'] || ''}</li>
            <li class="times">100 BK LCM: ${swimmer['100BKLCM'] || ''}</li>
            <li class="times">200 BK LCM: ${swimmer['200BKLCM'] || ''}</li>
            <li class="times">50 BR LCM: ${swimmer['50BRLCM'] || ''}</li>
            <li class="times">100 BR LCM: ${swimmer['100BRLCM'] || ''}</li>
            <li class="times">200 BR LCM: ${swimmer['200BRLCM'] || ''}</li>
            <li class="times">50 FL LCM: ${swimmer['50FLLCM'] || ''}</li>
            <li class="times">100 FL LCM: ${swimmer['100FLLCM'] || ''}</li>
            <li class="times">200 FL LCM: ${swimmer['200FLLCM'] || ''}</li>
            <li class="times">100 IM LCM: ${swimmer['100IMLCM'] || ''}</li>
            <li class="times">200 IM LCM: ${swimmer['200IMLCM'] || ''}</li>
            <li class="times">400 IM LCM: ${swimmer['400IMLCM'] || ''}</li>
        </ul>`
    
    //Append buttons to profile
    profileDiv.appendChild(swimmerProfileButtonsDiv);    

    return profileDiv;
}