// Moved Weather route to auth.js


const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const router = express.Router();

//Enable CORS - allows for cross requests from frontend
app.use(cors({
    origin: "http://localhost:5173"
}));

router.get('/', async (req, res) => {
    try {
        const ipAddress = (await axios.get('http://api.ipify.org')).data;
        const geoData = (await axios.get(`http://ip-api.com/json/${ipAddress}`)).data;
        const { lat, lon } = geoData;
  
        const gridpoints = (await axios.get(`https://api.weather.gov/points/${lat},${lon}`)).data;
        const { gridId: office, gridX, gridY } = gridpoints.properties;
  
        // Fetch hourly forecast
        const forecastHourly = (await axios.get(`https://api.weather.gov/gridpoints/${office}/${gridX},${gridY}/forecast/hourly`)).data;
        const forecastHourlyData = forecastHourly.properties.periods.slice(0, 12).map((period) => ({
            time: (new Date(period.startTime).toLocaleTimeString()),
            temperature: `${period.temperature}&degF`,
            shortForecast: period.shortForecast,
            icon: period.icon
        }));
  
        // Log hourly forecast data
        console.log("Hourly Forecast Data:", forecastHourlyData);
  
        // Fetch daily forecast
        const forecastDaily = (await axios.get(`https://api.weather.gov/gridpoints/${office}/${gridX},${gridY}/forecast`)).data;
        const forecastDailyData = forecastDaily.properties.periods.slice(0, 7).map((period) => ({
            time: period.name,
            temperature: `${period.temperature}&degF`,
            shortForecast: period.shortForecast,
            icon: period.icon
        }));
  
        // Log daily forecast data
        console.log("Daily Forecast Data:", forecastDailyData);
  
        const weatherData = {
            geoData,
            forecastHourly: forecastHourlyData,
            forecastDaily: forecastDailyData
        };
  
        res.json(weatherData);
    } catch (error) {
        console.error("Error in /auth/Weather:", error.message);
        res.status(500).json({ error: "Failed to fetch weather data", details: error.message });
    }
  });

  /*
// Set the server to listen on port 5001
app.listen(5001, () => {
    console.log('Server is running on http://localhost:5001');
});*/

module.exports = router;