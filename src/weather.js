// weather.js
import { getWeatherData } from './api.js'

async function processWeatherPrimaryData(location) {
    const result = await getWeatherData(location);
    return {
        city: result.address, 
        description: result.description,
        temperature: result.currentConditions.temp,
        sunrise: result.currentConditions.sunrise,
        sunset: result.currentConditions.sunset,
        moonphase: result.currentConditions.moonphase,
        todayoverview: result.days[0],
        feelslike: result.currentConditions.feelslike,
        precipitation: result.currentConditions.precip,
        windspeed: result.currentConditions.windspeed,
        humidity: result.currentConditions.humidity,
    }
}
export{ processWeatherPrimaryData }