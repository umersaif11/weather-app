//ui.js
function renderWeather(weatherData){
    const app = document.getElementById('app');
    app.innerHTML = '';

    const currentForecast = document.createElement('div');
    currentForecast.classList.add('currentForecast');
}
export { renderWeather }