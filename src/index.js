// index.js
import "./styles.css";
import { processWeatherData } from "./weather.js";
import { renderWeather, handleError } from "./ui.js";
import loading from "./images/fetchData.gif";
import welcomegif from "./images/welcome.gif";

let currentUnit = "metric";
let currentWeatherData = null;

const form = document.getElementById("weather-form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  document.getElementById("app").innerHTML = `
    <div class='welcome-message'>
     <img src=${loading} alt='Loading' class='welcome-gif'>
     <h2>Fetching Data...</h2>
    </div>   
    `;
  const locationInput = document.getElementById("location").value;
  try {
    currentWeatherData = await processWeatherData(locationInput);
    console.log(currentWeatherData);
    renderWeather(currentWeatherData, currentUnit);
  } catch (error) {
    handleError(error);
  }
});
const unitSwitch = document.getElementById("unitSwitch");
unitSwitch.addEventListener("change", () => {
  if (unitSwitch.checked) {
    currentUnit = "us";
  } else {
    currentUnit = "metric";
  }

  if (currentWeatherData) {
    document.getElementById("app").innerHTML = `
        <div class='welcome-message'>
            <img src=${loading} alt='Loading' class='welcome-gif'>
            <h2>Updating Units...</h2>
        </div>   
        `;
    setTimeout(() => {
      renderWeather(currentWeatherData, currentUnit);
    }, 1000);
  }
});
document.getElementById("app").innerHTML = `
  <div class='welcome-message'>
    <img src=${welcomegif} alt='Welcome' class='welcome-gif'>
    <h2>Weather at your fingertips</h2>
    <p>Enter a location above to see real-time weather updates</p>
  </div>   
  `;
