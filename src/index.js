// index.js
import "./styles.css";

const WeatherInfo = () => {
    async function getWeatherData(){
        try {
            const response = await fetch(
                `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/london?key=2VQ3QPNM3QNQE6SW7FCVEMYRT`);
            const responseData = await response.json();
            return responseData;
        
        }
        catch(error) {
            console.log('Network error:', error);
        }
    }
    async function processWeatherData() {
        const result = await getWeatherData();
        return {
           city: result.address, 
           description: result.description,
        }
    }
    console.log(processWeatherData());
    return {
        processWeatherData,
    }
}
WeatherInfo().processWeatherData();

  