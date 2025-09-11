//ui.js
import "weather-icons/css/weather-icons.css";
import badRequest from "./images/badRequest.gif";
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

const weatherImageMap = {
  "clear-day":
    "clear blue sky, radiant midday sun, no clouds, vivid light, high resolution, nature background",
  "clear-night":
    "star-filled night sky, bright full moon, deep navy blue tones, crystal clear atmosphere, high resolution",
  "partly-cloudy-day":
    "blue sky with scattered cumulus clouds, bright sunlight, soft shadows, peaceful atmosphere",
  "partly-cloudy-night":
    "night sky with scattered clouds, moonlight streaming through, soft contrast, tranquil mood",
  cloudy:
    "dense overcast sky, thick gray clouds, muted daylight, moody atmosphere, no ground visible",
  fog: "soft hazy sky, low visibility, pale muted tones, atmospheric mist, dreamy aesthetic",
  wind: "sky with fast-moving streaked clouds, dynamic motion, dramatic lighting, high contrast",
  rain: "dark stormy rain-filled sky, heavy gray clouds, visible rain streaks, moody dramatic feel",
  snow: "overcast winter sky, pale diffused light, falling snowflakes, cold serene mood",
  "snow-showers-day":
    "bright daylight with gentle falling snow, soft diffused light, white overcast sky",
  "snow-showers-night":
    "dark snowy night sky, faint moonlight glow, falling snowflakes, serene atmosphere",
  "thunder-rain":
    "dramatic storm clouds, heavy rain, lightning bolt cutting through, intense atmosphere",
  "thunder-showers-day":
    "daylight with dark storm clouds, lightning flashes, rain falling, high drama sky",
  "thunder-showers-night":
    "night sky illuminated by lightning, rain streaks visible, stormy mood",
  "showers-day":
    "overcast daytime sky, light drizzle, soft gray clouds, gentle lighting",
  "showers-night":
    "dark rainy night sky, faint glow through clouds, raindrops visible, moody ambiance",
};
function getWeatherIconClass(icon) {
    return weatherIconMap[icon] || 'wi-na';
}
function getMoonPhaseName(value) {
    if (value === 0) return 'New Moon';
    if (value > 0 && value < 0.25) return 'Waxing Crescent';
    if (value === 0.25) return 'First Quarter';
    if (value > 0.25 && value < 0.5) return 'Waxing Gibbous';
    if (value === 0.5) return 'Full Moon';
    if (value > 0.5 && value < 0.75) return 'Waning Gibbous';
    if (value === 0.75) return 'Last Quarter';
    return 'Waning Crescent';
}
function getMoonPhaseIcon(value) {
    if (value === 0) return 'new-moon';
    if (value > 0 && value < 0.25) return 'waxing-crescent';
    if (value === 0.25) return 'first-quarter';
    if (value > 0.25 && value < 0.5) return 'waxing-gibbous';
    if (value === 0.5) return 'full-moon';
    if (value > 0.5 && value < 0.75) return 'waning-gibbous';
    if (value === 0.75) return 'last-quarter';
    return 'waning-crescent';
}
function formatTime(timestr) {
  if(!timestr) return 'N/A';
  const date = new Date(`1970-01-01T${timestr}`);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'});
}
async function setLocationBackground(query) {
  const location = document.querySelector('.currentForecast');
  if(!location) return;
  try {
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`,
      {
        headers: {
          Authorization: 'RBhECvORcQjs8GUlW3FXmy7WwczHde6Tbhke2hr2tWRyY4acANLRq6A4',
        }
      }
    );
    const data = await response.json();

    if(data.photos && data.photos.length > 0) {
      const imageUrl = data.photos[0].src.landscape;
      location.style.backgroundImage = `url(${imageUrl})`;
      location.style.backgroundSize = 'cover';
      location.style.backgroundPosition = 'center';
      location.style.backgroundRepeat = 'no-repeat';
      location.style.color = '#fff';
      location.style.padding = '1rem';
      location.style.borderRadius = '10px';
      location.style.boxShadow = '0px 4px 15px rgba(0, 0, 0, 0.4)';
    }
  }
  catch(error) {
    console.log('Error fetching pexels:', error);
  }
}
function handleError(error) {
  document.getElementById('app').innerHTML = `
  <div class='welcome-message'>
    <img src=${badRequest} alt='Bad Request' class='welcome-gif'>
    <h2>Bad Request</h2>
    <p>${error}</p>
  </div>   
  `;
}
async function renderWeather(weatherData, currentUnit){
    const app = document.getElementById('app');
    const unitSymbol = (currentUnit === 'metric') ? '°C' : '°F';
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

    const sunMoonContainer = document.createElement('div');
    sunMoonContainer.classList.add('sunMoonTimes');

    const sunrise = document.createElement('div');
    sunrise.innerHTML = `
    <i class='wi ${getWeatherIconClass('sun-rise')}'>
    </i>
    Sunrise: ${formatTime(weatherData.sunrise)}`;

    const sunset = document.createElement('div');
    sunset.innerHTML = `
    <i class='wi ${getWeatherIconClass('sun-set')}'>
    </i>
    Sunset: ${formatTime(weatherData.sunset)}`;

    const moonPhaseValue = weatherData.moonphase;
    const moonphase = document.createElement('div');
    moonphase.innerHTML = `
    <i class='wi ${getWeatherIconClass(getMoonPhaseIcon(moonPhaseValue))}'>
    </i>
    ${getMoonPhaseName(moonPhaseValue)}`;

    sunMoonContainer.append(sunrise, sunset, moonphase);

    header.append(
        headerLocation,
        headerCountryCode,
        description,
        sunMoonContainer
    )

    currentForecast.appendChild(header);

    const todayDetails = document.createElement('div');
    todayDetails.classList.add('todayDetails');

    const todayOverview = document.createElement('div');
    todayOverview.classList.add('todayOverview');

    const todayHead = document.createElement('h3');
    todayHead.classList.add('todayHead');
    todayHead.textContent = "Today's Overview";

    const tempCards = document.createElement('div');
    tempCards.classList.add('tempCards');

    const now = new Date();
    const currentHour = now.getHours();
    const hours = weatherData.todayoverview;
    let count = 0;
    for(let i = currentHour; i < hours.length && count < 6; i+=3) {
      count++;
      const hour = hours[i];
      const tempCard = document.createElement('div');
      tempCard.classList.add('tempCard');

      const hourTime = document.createElement('p');
      const [h] = hour.datetime.split(':');
      let hourNum = parseInt(h, 10);
      const ampm = hourNum >= 12 ? 'PM' : 'AM';
      hourNum = hourNum % 12 || 12;
      hourTime.textContent = `${hourNum} ${ampm}`;

      const hourIcon = document.createElement('i');
      hourIcon.classList.add('wi', getWeatherIconClass(hour.icon));

      const tempValue = (
        currentUnit === 'metric') 
        ? hour.temperature.c 
        : hour.temperature.f;
      const hourTemp = document.createElement('p');
      hourTemp.textContent = `${tempValue} ${unitSymbol}`;

      tempCard.append(hourTime, hourIcon, hourTemp);
      tempCards.append(tempCard);
    }

    todayOverview.append(todayHead, tempCards);
    todayDetails.append(todayOverview);

    const feelslikeTemp = (
        currentUnit === 'metric') 
        ? weatherData.feelslike.c 
        : weatherData.feelslike.f;
    const metrics = document.createElement('div');
    metrics.classList.add('humidityWind');
    metrics.innerHTML = `
    <div>
     <i class="wi ${getWeatherIconClass('feelslike')}"></i>
     <strong>Feels Like</strong><br>${feelslikeTemp}${unitSymbol}
    </div>
    <div>
     <i class="wi ${getWeatherIconClass('rain')}"></i>
     <strong>Precipitation</strong><br>${weatherData.precipitation || 0}%
    </div>
    <div>
     <i class="wi ${getWeatherIconClass('windspeed')}"></i>
     <strong>Wind Speed</strong><br>${weatherData.windspeed} mph
    </div>
    <div>
     <i class="wi ${getWeatherIconClass('clear-day')}"></i>
     <strong>UV level</strong><br>${weatherData.uvlevel}
    </div>
    `
    
    todayDetails.append(metrics);

    currentForecast.append(todayDetails);

    app.appendChild(currentForecast);

    let iconKey = weatherData.icon;
    let searchTerm = weatherImageMap[iconKey] || 'beautiful sky landscape';
    await setLocationBackground(searchTerm);

    const forecast = document.createElement('div');
    forecast.classList.add('weeklyForecast');
    let isDayOne = 0;
    weatherData.upcomingdays.forEach((day) => {
      const dayCard = document.createElement('div');
      dayCard.classList.add('dayCard');

      const date = new Date(day.date);
      const options = { weekday: "short", month: "short", day: "numeric"}
      const fullDate = date.toLocaleDateString('en-US', options);

      const dateEl = document.createElement('p');
      if(isDayOne === 0) {
        isDayOne++;
        dateEl.textContent = 'Today';
        dateEl.style.fontWeight = 'bold'
      } else {
        dateEl.textContent = fullDate;
      }

      const icon = document.createElement('i');
      icon.classList.add('wi', getWeatherIconClass(day.icon));

      const maxTempValue = (
        currentUnit === 'metric') 
        ? day.tempmax.c 
        : day.tempmax.f;
      const minTempValue = (
        currentUnit === 'metric') 
        ? day.tempmin.c 
        : day.tempmin.f;
      const temp = document.createElement('p');
      temp.innerHTML = `
      ${day.conditions}<br>
      <strong>${maxTempValue}${unitSymbol}</strong>/
      ${minTempValue}${unitSymbol}    
      `    

      dayCard.append(dateEl, icon, temp);
      forecast.append(dayCard);
    })
    app.append(forecast);
}
export { renderWeather, handleError }