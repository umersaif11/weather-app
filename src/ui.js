//ui.js
const weatherIconMap = {
  "clear-day": "wi-day-sunny",
  "clear-night": "wi-night-clear",
  "partly-cloudy-day": "wi-day-cloudy",
  "partly-cloudy-night": "wi-night-alt-cloudy",
  cloudy: "wi-cloudy",
  fog: "wi-fog",
  wind: "wi-strong-wind",
  rain: "wi-rain",
  snow: "wi-snow",
  "snow-showers-day": "wi-day-snow",
  "snow-showers-night": "wi-night-alt-snow",
  "thunder-rain": "wi-thunderstorm",
  "thunder-showers-day": "wi-day-thunderstorm",
  "thunder-showers-night": "wi-night-alt-thunderstorm",
  "showers-day": "wi-day-showers",
  "showers-night": "wi-night-alt-showers",
  temperature: "wi-thermometer",
  feelslike: "wi-thermometer",
  humidity: "wi-humidity",
  windspeed: "wi-strong-wind",
  winddirection: "wi-wind-direction",
  compass: "wi-compass",
  barometer: "wi-barometer",
  raindrop: "wi-raindrop",
  degrees: "wi-degrees",
  "sun-rise": "wi-sunrise",
  "sun-set": "wi-sunset",
  pressure: "wi-barometer",
  "moon-rise": "wi-moonrise",
  "moon-set": "wi-moonset",
  "new-moon": "wi-moon-new",
  "waxing-crescent": "wi-moon-waxing-crescent-3",
  "first-quarter": "wi-moon-first-quarter",
  "waxing-gibbous": "wi-moon-waxing-gibbous-3",
  "full-moon": "wi-moon-full",
  "waning-gibbous": "wi-moon-waning-gibbous-3",
  "last-quarter": "wi-moon-third-quarter",
  "waning-crescent": "wi-moon-waning-crescent-3",
};


function renderWeather(weatherData){
    const app = document.getElementById('app');
    app.innerHTML = '';

    const currentForecast = document.createElement('div');
    currentForecast.classList.add('currentForecast');
    const header = document.createElement('div');
    header.classList.add('location');

    const headerLocation = document.createElement('h2');
    headerLocation.classList.add('locationHead');
    headerLocation.textContent = weatherData.city;

    const headerCountryCode = document.createElement('h4');
    headerCountryCode.classList.add('locationCountryCode');
    const countryCode = ' ' + weatherData.countrycode;
    headerCountryCode.textContent = countryCode
    ? (', ' + countryCode.toUpperCase())
    : '';

    const description = document.createElement('p');
    description.classList.add('weather-description');
    description.textContent = weatherData.description;

    header.append(
        headerLocation,
        headerCountryCode,
        description
    )

    currentForecast.appendChild(header);

    app.appendChild(currentForecast);


}
export { renderWeather }