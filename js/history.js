import { loadHeaderFooter } from "./functions.mjs";
import SwimmerHistory from "./build-history.mjs";

loadHeaderFooter();

//Create new instance of SwimmerHistory
const swimmerHistory = new SwimmerHistory();
swimmerHistory.init();


