// index.js
import "./styles.css";
import { processWeatherData } from "./weather.js";
import { renderWeather } from "./ui.js"

let currentUnit = 'metric';
let currentWeatherData = null;

const refinedDataObject = await processWeatherData("hafizabad, pakistan");
console.log(refinedDataObject);
renderWeather(refinedDataObject, currentUnit);

const form = document.getElementById('weather-form');
form.addEventListener('submit', async (e) => {
    e.preventDefault();
})
