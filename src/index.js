// index.js
import "./styles.css";
import { processWeatherData } from "./weather.js";
import { renderWeather } from "./ui.js"

const refinedDataObject = await processWeatherData("sydney");
console.log(refinedDataObject);
renderWeather(refinedDataObject, 'Sydney');
