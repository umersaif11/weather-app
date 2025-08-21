// api.js

async function getWeatherData(location = "london") {
  const locationParameter = location ? encodeURIComponent(location) : "london";
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locationParameter}?key=2VQ3QPNM3QNQE6SW7FCVEMYRT`,
    );
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.log("Network error:", error);
  }
}
export { getWeatherData };
