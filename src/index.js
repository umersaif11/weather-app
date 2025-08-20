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
    }
    catch {

    }
}
getWeather();
  