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
        this.renderSwimmers();  
    }


    async addSwimmerToAccount(form) {        
        //Pull form data from form        
        const formData = new FormData(form);
        const swimmerProfile = Object.fromEntries(formData.entries());

        //Create an id using the date in ms plus a random time to ensure it's unique
        swimmerProfile.id = Date.now().toString() + Math.floor(Math.random() * 1000);

        //Call the dataSource to save to MockAPI
        const newSwimmer = await this.dataSource.addSwimmer(swimmerProfile);        
        this.swimmers.push(newSwimmer);
        
        //Display the new profile
        this.renderSwimmerProfile(newSwimmer);

        //Reset and hide form
        form.reset();
        form.classList.add('hide'); //Hides the form again since toggling removed the 'hide' class
    }

    //Render one swimmer profile
    renderSwimmerProfile(swimmer) {
        return swimmerProfileTemplate(swimmer);
    }

    //Render all swimmer profiles
    renderAllSwimmerProfiles() {        
        this.swimmers.forEach(swimmer => this.renderSwimmerProfile(swimmer));
    }
}

//GLOBAL FUNCTIONS:
function swimmerProfileTemplate(swimmer) {
    //Get div where profiles will be displayed
    const container = document.getElementById('template-swimmer');

    //Clear previous profiles so they're not rendered more than once
    container.innerHTML = "";

    //Create new div to hold profile
    const profileDiv = document.createElement('div');
    profileDiv.classList.add('swimmer-profile');

    //Calculate swimmer's age
    const today = new Date();
    const birthdate = new Date(swimmer.birthdate);
    const msInYear = 1000 * 60 * 60 * 24 * 365.2425;  //The .2425 accounts for leap years
    let age = Math.floor((today - birthdate) / msInYear);

    //Enter info into template
    profileDiv.innerHTML = `
        <h2>Name: ${swimmer.fname} ${swimmer.lname}</h2>
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
    
    //Append swimmer profile to original div
    container.appendChild(profileDiv);
}