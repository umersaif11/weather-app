//ui.js
function renderWeather(weatherData){
    const app = document.getElementById('app');
    app.innerHTML = `
    <h2>${weatherData.city}</h2>
    <p>Current Temp: ${weatherData.temperature.f} °F</p>
    `
}
export { renderWeather }