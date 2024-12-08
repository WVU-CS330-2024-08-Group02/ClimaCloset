import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { CenterContainer } from '../../components/CenterContainer/CenterContainer';
import 'leaflet/dist/leaflet.css';
import './Weather.css';
import L from 'leaflet';
import 'leaflet-control-geocoder';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css'; // Import geocoder CSS
import SunnyIcon from "../../assets/weatherIcons/Sun.png";
import StormyIcon from "../../assets/weatherIcons/Rainy.png"
import CloudyIcon from "../../assets/weatherIcons/Cloud.png"
import SunnyCloudyIcon from "../../assets/weatherIcons/Sun_and_Cloud.png"
import SnowyIcon from "../../assets/weatherIcons/Snowy.png"

// Function to determine the color of the progress bar based on temperature value
function getColor(value) {
    if (value <= 40) {
        return 'lightblue';
    } else if (value <= 60) {
        return '#FFEB3B';
    } else if (value <= 90) {
        return 'orange';
    } else {
        return '#CD5C5C';
    }
}

// Progress bar component that takes current, minimum, and maximum temperature values
function ProgressBar({ value, min, max }) {
    // Calculate progress percentage based on temperature range
    const progress = ((value - min) / (max - min)) * 100;


    return (
        <div className="progress-bar-container">
            {/* Style progress bar width and color based on temperature value */}
            <div
                className="progress-bar"
                style={{ width: `${Math.min(Math.max(progress, 0), 100)}%`, backgroundColor: getColor(value) }}
            ></div>
        </div>
    );
}

// Main component for displaying weather information
export function Weather() {
   
    // Initial coordinates to be shown on the map
    const [position, setPosition]= useState([39.64591951232883, -79.97339559170358]);


    // Display searched location name
    const [location, setLocation] = useState('Your Current Location');


    // State to toggle between showing the 12-hour and 7-day forecast containers
    const [isFirstContainerVisible, setIsFirstContainerVisible] = useState(true);

    const [forecastHourly, setForecastHourly] = useState([]);
    const [forecastDaily, setForecastDaily] = useState([]);

    // Function to toggle between the 12-hour and 7-day forecast view
    const toggleContainer = () => {
        setIsFirstContainerVisible(!isFirstContainerVisible);
    };

    //Fetch weather data
    useEffect(() => {
        //Make GET request to the backend API to fetch weather data
        axios.get('http://localhost:5001/WeatherAPI')  
            .then(response => {
                const { geoData, forecastHourly, forecastDaily } = response.data;
               
                //Set the location data from geoData
                setPosition([geoData.lat, geoData.lon]);
               
                // Set hourly and daily forecast data
                setForecastHourly(forecastHourly.properties.periods);  // Hourly forecast
                setForecastDaily(forecastDaily.properties.periods);  // Daily forecast
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
            });
    }, []);

    //Render loading state while the data is being fetched
    if (forecastHourly.length === 0 || forecastDaily.length === 0) {
        return <div>Loading...</div>;
    }

    const mapRef = useRef();
    const searchInputRef = useRef(); // *** Fix for page not rendering, not sure if this is intended

    useEffect(() => {
        // After map has rendered, initialize geocoder control
        const map = mapRef.current?.leafletElement;

        // Add the geocoder control
        if (map && !map.hasGeocoder) {
            const geocoder = L.Control.geocoder({
                defaultMarkGeocode: true,
            }).addTo(map);

            // Event listener for when a location is found
            geocoder.on('markgeocode', function(e) {
                const latlng = e.geocode.center;
                setPosition([latlng.lat, latlng.lng]);
                setLocation(e.geocode.name);
            });

            map.hasGeocoder = true;
        }
    }, [])

    // Handle when for a user searches a location
    const handleSearch = () => {
        const query = searchInputRef.current.value;
        if (query) {
            const geocoder = L.Control.Geocoder.nominatim();
            geocoder.geocode(query, (results) => {
                if (results.length > 0) {
                    const { center, name } = results[0];
                    setPosition([center.lat, center.lng]);
                    setLocation(name);
                } else {
                    alert('Location not found');
                }
            });
        }
    };

    // Helper function to determine the icon based on short forecast
    const getIconForForecast = (forecast) => {
        if (forecast.includes("Snow")) {
            return SnowyIcon;
        } else if (forecast.includes("Rain")) {
            return RainyIcon;
        } else if (forecast.includes("Storm")) {
            return StormyIcon;
        } else if (forecast.includes("Cloudy")) {
            return CloudyIcon;
        } else if (forecast.includes('Partly Cloudy')) {
            return SunnyCloudyIcon;
        } else if (forecast.includes("Clear")) {
            return SunnyIcon;
        } else {
            return SunnyIcon;
        }
    };

    // Map hourly forecast data to display
    const hourlyForecastData = forecastHourly.map(hour => {
        const icon = getIconForForecast(hour.shortForecast);  
        return {
            time: hour.name,
            temp: `${hour.temperature}°F`,
            imgSrc: icon,
           // forecast: hour.shortForecast, //Short description of the weather
        };
    });

    //Map daily forecast data to display
    const dailyForecastData = forecastDaily.map((day, index) => {
        const icon = getIconForForecast(day.shortForecast);
        return {
            time: day.name,
            temp: `${day.temperature}°F`,
            imgSrc: icon,
        };
    });

    return (
        <>
            <CenterContainer>
                {/* Display the title */}
                <div className='top-section'>
                    <div className='left-box'>
                        {/* Parent container for map and search bar*/}
                        <div className="map-and-search-container">
                            {/* Search bar containter displayng searchbar above map*/}
                            <div className="search-bar-style">
                                <input
                                    type="text"
                                    placeholder="Search for a location..."
                                    ref={searchInputRef}
                                    className="search-input"
                                />
                                <button onClick={handleSearch} className="search-button">
                                    Search
                                </button>
                            </div>
                            {/* Map container showing the user's current location */}
                            <div className="map-container-style">
                                <MapContainer center={position} zoom={6} ref={mapRef} style={{height: '100%', width: '100%'}}>
                                    <TileLayer
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                                    />
                                    <Marker position={position}>
                                        <Popup>{location}</Popup>
                                    </Marker>
                                </MapContainer>
                            </div>
                        </div>
                    </div>
               
                       
                    <div className="right-box">
                        {/* Circle displaying current weather and temperature */}
                        <div className="circle-style">
                            <span style={{ fontSize: '30px', marginTop: '20px' }}>Snowy</span>
                            <span style={{ marginTop: '-50px' }}>34&deg;</span>
                        </div>


                        {/* Centered progress bar displaying temperature range */}
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                            <ProgressBar value={34} min={29} max={40} />
                        </div>


                        {/* Display the temperature range text */}
                        <div>
                            <span className="text-style">Low of  29&deg; High of 40&deg;</span>
                        </div>
                    </div>
                </div>
                <div className='bottom-bar'>
                    {/* Container for displaying either the 12-hour or 7-day forecast */}
                    <div style={{marginTop: '20px'}}>
                        <div className="container-wrapper-style">
                        {isFirstContainerVisible ? (//Render 12-hour forecast data
                            hourlyForecastData.map((data, index) => (
                                <div key={index} className="rounded-rectangle-style">
                                    <span className="text-style">{data.time}</span>
                                    <img src={data.imgSrc} className="img-style" alt="Weather icon" />
                                    <span className="temp-style" dangerouslySetInnerHTML={{ __html: data.temp }} />
                                </div>
                            ))
                        ) : (
                            //Render 7-day forecast data using the correct variable (dailyForecastData)
                            dailyForecastData.map((data, index) => (
                                <div key={index} className="rounded-rectangle-style">
                                    <span className="text-style">{data.time}</span>
                                    <img src={data.imgSrc} className="img-style" alt="Weather icon" />
                                    <span className="temp-style" dangerouslySetInnerHTML={{ __html: data.temp }} />
                                </div>
                            ))
                        )}
                        </div>
                    </div>


                    {/* Toggle button to switch between the 12-hour and 7-day forecast */}
                    <button onClick={toggleContainer} className="toggle-button">
                        {isFirstContainerVisible ? 'Show 7 day Forecast' : 'Show 12 hour Forecast'}
                    </button>
                </div>
            </CenterContainer>
        </>
    );
}
