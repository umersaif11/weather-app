//ui.js
import "weather-icons/css/weather-icons.css";
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
    const hours = weatherData.todayOverview;
    let count = 0;
    for(let i = currentHour; i < hours.length && count < 6; i+=3) {
      count++;
      
    }

    todayOverview.append(todayHead);
    todayDetails.append(todayOverview);

    currentForecast.append(todayDetails);

    app.appendChild(currentForecast);

    let iconKey = weatherData.icon;
    let searchTerm = weatherImageMap[iconKey] || 'beautiful sky landscape';
    await setLocationBackground(searchTerm);

}
export { renderWeather }