// api.js

async function getWeatherData(lat, lon) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${lon}?key=2VQ3QPNM3QNQE6SW7FCVEMYRT`,
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
  if(response.status === 404) {
    throw new Error('Location not found');
  }
  if(!response.ok){
    throw new Error(`locationIQ api error: ${response.status}`);
  }
  const data = await response.json();
  return data;
}
export { 
  getWeatherData,
  getLocationData
};
