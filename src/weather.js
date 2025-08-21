// weather.js
import { getWeatherData } from './api.js'

async function processWeatherData(location) {
    const result = await getWeatherData(location);
    const todayOverview = [];
    const upcomingDays = [];
    const sevenUpcomingDays = result.days.slice(0,8);
    for(let i = 0; i < result.days[0].hours.length; i++){
        todayOverview.push({
            time: result.days[0].hours[i].datetime,
            temperature: result.days[0].hours[i].temp
        })
    }
    for(let i = 0; i < sevenUpcomingDays.length; i++){
        upcomingDays.push({
            date: sevenUpcomingDays[i].datetime,
            tempmax: sevenUpcomingDays[i].tempmax,
            tempmin: sevenUpcomingDays[i].tempmin,
            conditions: sevenUpcomingDays[i].conditions
        })
    }
    return {
        city: result.address, 
        description: result.description,
        temperature: result.currentConditions.temp,
        sunrise: result.currentConditions.sunrise,
        sunset: result.currentConditions.sunset,
        moonphase: result.currentConditions.moonphase,
        todayoverview: todayOverview,
        feelslike: result.currentConditions.feelslike,
        precipitation: result.currentConditions.precip,
        windspeed: result.currentConditions.windspeed,
        uvlevel: result.days[0].uvindex,
        humidity: result.currentConditions.humidity,
        upcomingdays: upcomingDays
    }
}
export{ processWeatherData }