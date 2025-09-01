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

async function getLocationData(location){
  const encodedLocation = encodeURIComponent(location);
  const response = await fetch(
    `https://us1.locationiq.com/v1/search?key=pk.878c1fdb1c7c62477f111ba0d35333bf&q=${encodedLocation}&format=json&limit=1&namedetails=1&addressdetails=1`
  );
  console.log(response)
}
export { 
  getWeatherData,
  getLocationData
};
