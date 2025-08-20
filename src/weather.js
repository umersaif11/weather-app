// weather.js
import {getWeatherData} from './api.js'

async function processWeatherData() {
    const result = await getWeatherData();
    return {
        city: result.address, 
        description: result.description,
    }
}
export{ processWeatherData }