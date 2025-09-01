//ui.js
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
    const countryCode = ' ' + weatherData.countrycode.toUpperCase();
    headerCountryCode.textContent = countryCode
    ? (', ', countryCode)
    : '';

    header.appendChild(
        headerLocation,
        headerCountryCode,
    )

    currentForecast.appendChild(header);

    app.appendChild(currentForecast);


}
export { renderWeather }