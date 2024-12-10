import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup, useMap  } from 'react-leaflet';
import { CenterContainer } from '../../components/CenterContainer/CenterContainer';
import 'leaflet/dist/leaflet.css';
import './Weather.css';
import L from 'leaflet';
import 'leaflet-control-geocoder';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css'; // Import geocoder CSS
import SunnyIcon from "../../assets/weatherIcons/Sun.png";
import StormyIcon from "../../assets/weatherIcons/Stormy.png"
import CloudyIcon from "../../assets/weatherIcons/Cloud.png"
import SunnyCloudyIcon from "../../assets/weatherIcons/Sun_and_Cloud.png"
import SnowyIcon from "../../assets/weatherIcons/Snowy.png"
import RainyIcon from "../../assets/weatherIcons/PlaceholderRainy.png" // Placeholder Icon
import NightIcon from "../../assets/weatherIcons/Night.png" // Night icon
import DefaultIcon from "../../assets/ClosetLogo.png"

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

    const mapRef = useRef();
    const searchInputRef = useRef();

    // Function to toggle between the 12-hour and 7-day forecast view
    const toggleContainer = () => {
        setIsFirstContainerVisible(!isFirstContainerVisible);
    };
    

    useEffect(() => {
        axios.get('http://localhost:5001/weather/')  
            .then(response => {
                const { geoData, forecastHourly, forecastDaily } = response.data;
    
                // Log the data received
                console.log("Received GeoData:", geoData);
                console.log("Received Hourly Forecast:", forecastHourly);
                console.log("Received Daily Forecast:", forecastDaily);
    
                // Set the location data from geoData
                setPosition([geoData.lat, geoData.lon]);
    
                // Safely set the forecast data
                if (forecastHourly && forecastHourly.length) {
                    setForecastHourly(forecastHourly);  // Hourly forecast
                } else {
                    console.error('Hourly forecast data is missing or empty');
                }
    
                if (forecastDaily && forecastDaily.length) {
                    setForecastDaily(forecastDaily);  // Daily forecast
                } else {
                    console.error('Daily forecast data is missing or empty');
                }
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
            });
    }, []);

    useEffect(() => {
        const map = mapRef.current?.leafletElement; // Safely access mapRef
    
        if (map && !map.hasGeocoder) {
            const geocoder = L.Control.geocoder({
                defaultMarkGeocode: true,
            }).addTo(map);
    
            geocoder.on('markgeocode', function (e) {
                const latlng = e.geocode.center;
                setPosition([latlng.lat, latlng.lng]); // Update position state
                setLocation(e.geocode.name); // Update location state
            });
    
            map.hasGeocoder = true; // Mark geocoder as initialized
        }
    }, []); // Ensure this runs only once after the initial render

    //
    const MapHandler = ({ position }) => {
        const map = useMap(); // Get the Leaflet map instance
        useEffect(() => {
            map.setView(position, map.getZoom()); // Update the map view when position changes
        }, [position, map]);
        return null;
    };

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
        } else if (forecast.isDaytime){ // If weather clear and is day
            return SunnyIcon;
        } else if (!forecast.isDaytime) { // If weather clear and is night
            return NightIcon
        } else {
            return DefaultIcon; // This should never happen
        }
            
    };

    // Helper function to print abbreviate of day
    const getDayAbbreviation = (day) => {
        if (day.includes("Sunday")) {
            return "Sun";
        } else if (day.includes("Monday")) {
            return "Mon";
        } else if (day.includes("Tuesday")) {
            return "Tue";
        } else if (day.includes("Wednesday")) {
            return "Wed";
        } else if (day.includes("Thursday")) {
            return "Thu";
        } else if (day.includes("Friday")) {
            return "Fri";
        } else if (day.includes("Saturday")) {
            return "Sat";
        } else if (day.includes("Tonight")) {
            return "Ton"
        }

    };

    // Helper function to get shortend time
    const getShortenedTime = (time) => {
        if (time.includes("12:00:00 AM")) {
            return "12AM";
        } else if (time.includes("1:00:00 AM")) {
            return "1AM";
        } else if (time.includes("2:00:00 AM")) {
            return "2AM";
        } else if (time.includes("3:00:00 AM")) {
            return "3AM";
        } else if (time.includes("4:00:00 AM")) {
            return "4AM";
        } else if (time.includes("5:00:00 AM")) {
            return "5AM";
        } else if (time.includes("6:00:00 AM")) {
            return "6AM";
        } else if (time.includes("7:00:00 AM")) {
            return "7AM";
        } else if (time.includes("8:00:00 AM")) {
            return "8AM";
        } else if (time.includes("9:00:00 AM")) {
            return "9AM";
        } else if (time.includes("10:00:00 AM")) {
            return "10AM";
        } else if (time.includes("11:00:00 AM")) {
            return "11AM";
        } else if (time.includes("12:00:00 PM")) {
            return "12PM";
        } else if (time.includes("1:00:00 PM")) {
            return "1PM";
        } else if (time.includes("2:00:00 PM")) {
            return "2PM";
        } else if (time.includes("3:00:00 PM")) {
            return "3PM";
        } else if (time.includes("4:00:00 PM")) {
            return "4PM";
        } else if (time.includes("5:00:00 PM")) {
            return "5PM";
        } else if (time.includes("6:00:00 PM")) {
            return "6PM";
        } else if (time.includes("7:00:00 PM")) {
            return "7PM";
        } else if (time.includes("8:00:00 PM")) {
            return "8PM";
        } else if (time.includes("9:00:00 PM")) {
            return "9PM";
        } else if (time.includes("10:00:00 PM")) {
            return "10PM";
        } else if (time.includes("11:00:00 PM")) {
            return "11PM";
        }
    };

    // Map hourly forecast data to display
    const hourlyForecastData = forecastHourly.map(hour => {
        const icon = getIconForForecast(hour.shortForecast);  
        const shortTime = getShortenedTime(hour.time)
        return {
            time: shortTime,
            temp: `${hour.temperature}`,
            imgSrc: icon,
            forecast: hour.shortForecast, //Short description of the weather
        };
    });

    //Map daily forecast data to display
    const dailyForecastData = forecastDaily.map((day, index) => {
        const icon = getIconForForecast(day.shortForecast);
        const abbrevTime = getDayAbbreviation(day.time);
        return {
            time: abbrevTime,
            temp: `${day.temperature}`,
            imgSrc: icon,
        };
    });

    if (!forecastHourly.length || !forecastDaily.length) {
        return (
            <CenterContainer>
                <div className="loading-container">
                    <div>Loading weather data...</div>
                </div>
            </CenterContainer>
        );
    }

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
                                    id="searchbar"
                                    placeholder="Search for a location..."
                                    ref={searchInputRef}
                                    className="search-input"
                                />
                                <button onClick={handleSearch} className="search-button" htmlFor="searchbar">
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
                                    <MapHandler position={position} />
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
