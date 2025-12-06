//Functions to be used on multiple web pages

//Function to call templates
export async function loadTemplate(path) {
    const response = await fetch(path);
    const template = await response.text();
    return template;
}

//Function to create the header and footer for each webpage
export function renderWithTemplate(template, parentElement, callback) {
    //Check if there is a callback function
    parentElement.innerHTML = template;
    if (callback) {
        callback(); 
    }
}

//Function to load headers and footers
export async function loadHeaderFooter() {
    //Load and publish header
    const headerTemplate = await loadTemplate("/partials/header.html"); //Use an absolute file path rather than relative so it will load regardless of where the webpage is in the folders
    const headerElement = document.querySelector(".header"); //use class rather than id so it can be applied to all webpages
    renderWithTemplate(headerTemplate, headerElement);

    //Load and publish footer
    const footerTemplate = await loadTemplate("/partials/footer.html"); //Use an absolute file path rather than relative so it will load regardless of where the webpage is in the folders
    const footerElement = document.querySelector(".footer"); //use class rather than id so it can be applied to all webpages
    renderWithTemplate(footerTemplate, footerElement); //no callback function in the footer
}

// Function to retrieve data from localstorage
export function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}

// Function to save data to local storage
export function setLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}