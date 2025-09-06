// index.js
import "./styles.css";
import { processWeatherData } from "./weather.js";
import { renderWeather } from "./ui.js"

const refinedDataObject = await processWeatherData("hafizabad, pakistan");
console.log(refinedDataObject);
renderWeather(refinedDataObject);
async function setLocationBackground(query) {
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`,
      {
        headers: {
          Authorization: 'RBhECvORcQjs8GUlW3FXmy7WwczHde6Tbhke2hr2tWRyY4acANLRq6A4',
        }
      }
    );
    const data = await response.json();
    console.log(data);
}
setLocationBackground('sun rise');