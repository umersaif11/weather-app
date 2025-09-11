// weather.js
import { getWeatherData, getLocationData } from "./api.js";

function convertToCelsius(fahrenheit) {
  return Math.round((((fahrenheit - 32) * 5) / 9) * 10) / 10;
}
async function processLocationData(location) {
  const data = await getLocationData(location);
  if (!data[0]) throw new Error("Location not found");
  return {
    lat: data[0].lat,
    lon: data[0].lon,
    displayCityName: data[0].namedetails["name:en"]
      ? data[0].namedetails["name:en"]
      : data[0].namedetails.name,
    countryCode: data[0].address.country_code,
  };
}

async function processWeatherData(location) {
  const locationIQ = await processLocationData(location);
  const result = await getWeatherData(locationIQ.lat, locationIQ.lon);
  const sevenUpcomingDays = result.days.slice(0, 7);
  const todayAndTomorrow = [...result.days[0].hours, ...result.days[1].hours];
  const todayOverview = todayAndTomorrow.map((dayhour) => {
    return {
      time: dayhour.datetime,
      temperature: {
        f: dayhour.temp,
        c: convertToCelsius(dayhour.temp),
      },
      datetime: dayhour.datetime,
      icon: dayhour.icon,
    };
  });
  const upcomingDays = sevenUpcomingDays.map((day) => {
    return {
      date: day.datetime,
      tempmax: {
        f: Math.round(day.tempmax),
        c: Math.round(convertToCelsius(day.tempmax)),
      },
      tempmin: {
        f: Math.round(day.tempmin),
        c: Math.round(convertToCelsius(day.tempmin)),
      },
      conditions: day.conditions,
      icon: day.icon,
    };
  });
  return {
    city: locationIQ.displayCityName,
    countrycode: locationIQ.countryCode,
    lon: locationIQ.lon,
    lat: locationIQ.lat,
    description: result.description,
    temperature: {
      f: result.currentConditions.temp,
      c: convertToCelsius(result.currentConditions.temp),
    },
    sunrise: result.days[0].sunrise,
    sunset: result.days[0].sunset,
    moonphase: result.days[0].moonphase,
    todayoverview: todayOverview,
    feelslike: {
      f: result.currentConditions.feelslike,
      c: convertToCelsius(result.currentConditions.feelslike),
    },
    precipitation: result.currentConditions.precipprob,
    windspeed: result.currentConditions.windspeed,
    uvlevel: result.currentConditions.uvindex,
    humidity: result.currentConditions.humidity,
    upcomingdays: upcomingDays,
    icon: result.days[0].icon,
  };
}
export { processWeatherData };
