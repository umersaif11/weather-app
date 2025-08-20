// index.js
import "./styles.css";

async function getWeather(){
    try {
        const response = await fetch(
            `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/london?key=2VQ3QPNM3QNQE6SW7FCVEMYRT`);
        console.log(response);
        if(!response.ok){
            throw new Error('Whops! Error:', response.status);
        }
        const responseData = await response.json();
        console.log(responseData);
    }
    catch(error) {
        console.log('Network error:', error);
    }
}
getWeather();
  