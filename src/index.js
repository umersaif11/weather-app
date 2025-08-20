// index.js
import "./styles.css";
import { processWeatherData } from './weather.js'

const refinedDataObject = await processWeatherData();
console.log(refinedDataObject);