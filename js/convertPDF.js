//Using OCR.space to convert PDF file into JSON
const my_API_key = 'K85601721788957';

const SCSwimmingURL = 'https://www.gomotionapp.com/szscslsc/UserFiles/Image/QuickUpload/2025-2026-scswimming_095905.pdf';
const USASwimmingURL = 'https://websitedevsa.blob.core.windows.net/sitefinity/docs/default-source/timesdocuments/time-standards/2025/2028-motivational-standards-age-group.pdf';

async function ocrPDF(name, url) {
    const endpoint = `https://api.ocr.space/parse/imageurl?apikey=${my_API_key}&url=${url}`;

    const response = await fetch(endpoint);
    const result = await response.json();
    console.log(result);

    //Write forEach with the index being the value for each page.
    const shortCourseYds = result.ParsedResults[0];
    const longCourseMs = result.ParsedResults[1];

};

ocrPDF('SCSwimming', SCSwimmingURL);

ocrPDF('USASwimming', USASwimmingURL);