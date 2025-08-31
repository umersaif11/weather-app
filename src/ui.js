//ui.js
function renderWeather(weatherData){
    const app = document.getElementById('app');
    app.innerHTML = '';

    const currentForecast = document.createElement('div');
    currentForecast.classList.add('currentForecast');
    const header = document.createElement('div');
    header.classList.add('location');
    currentForecast.appendChild(header);

    app.appendChild(currentForecast);


}
export { renderWeather }