// Import libraries and modules 
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const router = express.Router();

// Enable CORS to allow for cross requests from frontend
app.use(cors({
    origin: "http://localhost:5173"
}));

// Route for fetching weather data from user's IP address
router.get('/', async (req, res) => {
    try {
        // Fetch user's IP address with Ipify's API
        const ipAddress = (await axios.get('http://api.ipify.org')).data;
        const geoData = (await axios.get(`http://ip-api.com/json/${ipAddress}`)).data;
        const { lat, lon } = geoData;
  
        // Fetch grid points for the NWS API
        const gridpoints = (await axios.get(`https://api.weather.gov/points/${lat},${lon}`)).data;
        const { gridId: office, gridX, gridY } = gridpoints.properties;
  
        // Fetch hourly forecast with NWS API & simplify the weather data
        const forecastHourly = (await axios.get(`https://api.weather.gov/gridpoints/${office}/${gridX},${gridY}/forecast/hourly`)).data;
        const forecastHourlyData = forecastHourly.properties.periods.slice(0, 12).map((period) => ({
            time: (new Date(period.startTime).toLocaleTimeString()),
            temperature: `${period.temperature}°F`,
            shortForecast: period.shortForecast,
            icon: period.icon
        }));
  
        // Log hourly forecast data 
        console.log("Hourly Forecast Data:", forecastHourlyData);
  
        // Fetch daily forecast with NWS API & simplify the weather data
        const forecastDaily = (await axios.get(`https://api.weather.gov/gridpoints/${office}/${gridX},${gridY}/forecast`)).data;
        const forecastDailyData = forecastDaily.properties.periods.slice(0, 7).map((period) => ({
            time: period.name,
            temperature: `${period.temperature}°F`,
            shortForecast: period.shortForecast,
            icon: period.icon
        }));
  
        // Log daily forecast data
        console.log("Daily Forecast Data:", forecastDailyData);
  
        // Bundle all of the weather data into an object
        const weatherData = {
            geoData,
            forecastHourly: forecastHourlyData,
            forecastDaily: forecastDailyData
        };
  
        // Send the weather data as a JSON response 
        res.json(weatherData);

        // Error handling message if weather or IP request fails
    } catch (error) {
        console.error("Error in /weather/:", error.message);
        res.status(500).json({ error: "Failed to fetch weather data", details: error.message });
    }
  });

// Export the router instance for use in other files
module.exports = router;