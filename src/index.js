// index.js
import "./styles.css";
import { processWeatherData } from "./weather.js";
import { renderWeather } from "./ui.js"

const refinedDataObject = await processWeatherData("sydney");
console.log(refinedDataObject);
renderWeather(refinedDataObject, 'Sydney');

async function getLocationData(location){
  const encodedLocation = encodeURIComponent(location);
  const response = await fetch(
    `https://us1.locationiq.com/v1/search?key=pk.878c1fdb1c7c62477f111ba0d35333bf&q=${encodedLocation}&format=json&limit=1&namedetails=1&addressdetails=1`
  );
  console.log(response)
  
}
getLocationData('sydney');