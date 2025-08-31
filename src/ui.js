//ui.js
function renderWeather(weatherData, displayCityName){
    const app = document.getElementById('app');
    app.innerHTML = '';

    const currentForecast = document.createElement('div');
    currentForecast.classList.add('currentForecast');
    const header = document.createElement('div');
    header.classList.add('location');

    const headerLocation = document.createElement('h2');
    headerLocation.classList.add('locationHead');
    headerLocation.textContent = displayCityName;

    header.appendChild(
        headerLocation
    )

    currentForecast.appendChild(header);

    app.appendChild(currentForecast);


}
export { renderWeather }