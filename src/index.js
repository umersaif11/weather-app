// index.js
import "./styles.css";
import { processWeatherData } from "./weather.js";
import { renderWeather } from "./ui.js";
import loading from "./images/fetchData.gif"

let currentUnit = 'metric';
let currentWeatherData = null;

const form = document.getElementById('weather-form');
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.getElementById('app').innerHTML = `
    <div class='welcome-message'>
     <img src=${loading} alt='Loading' class='welcome.gif'>
     <h2>Fetching Data...</h2>
    </div>   
    `;
    const locationInput = document.getElementById('location').value;
    try {
        currentWeatherData = await processWeatherData(locationInput);
        console.log(currentWeatherData);
        renderWeather(currentWeatherData, currentUnit);
    }
    catch(error) {
        
    }
})
