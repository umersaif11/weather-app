// weather.js
import { getWeatherData } from './api.js'

function convertToCelsius(fahrenheit) {
  return Math.round(((fahrenheit - 32) * 5 / 9) * 10) / 10;
}

async function processWeatherData(location) {
    const result = await getWeatherData(location);
    const sevenUpcomingDays = result.days.slice(0,8);
    const todayOverview = result.days[0].hours.map(dayhour => {
        return {
            time: dayhour.datetime,
            temperature: {
                f: dayhour.temp,
                c: convertToCelsius(dayhour.temp)
            }
        }
    })
    const upcomingDays = sevenUpcomingDays.map(day => {
        return {
            date: day.datetime,
            tempmax: {
                f: day.tempmax,
                c: convertToCelsius(day.tempmax)
            },
            tempmin: {
                f: day.tempmin,
                c: convertToCelsius(day.tempmin)
            },
            conditions: day.conditions
        }
    })
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