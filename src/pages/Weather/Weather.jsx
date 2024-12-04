import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { CenterContainer } from '../../components/CenterContainer/CenterContainer';
import 'leaflet/dist/leaflet.css';
import './Weather.css';
import L from 'leaflet';
import 'leaflet-control-geocoder';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css'; // Import geocoder CSS

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

    // Function to toggle between the 12-hour and 7-day forecast view
    const toggleContainer = () => {
        setIsFirstContainerVisible(!isFirstContainerVisible);
    };

    const mapRef = useRef();

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

    // Data for the 12-hour forecast (time, temperature, and icon) 
    const firstContainerData = [
        { time: 'Now', temp: '34&deg;', imgSrc: 'src/assets/Snowy.png' },
        { time: '12 pm', temp: '35&deg;', imgSrc: 'src/assets/Snowy.png' },
        { time: '1 pm', temp: '36&deg;', imgSrc: 'src/assets/Snowy.png' },
        { time: '2 pm', temp: '36&deg;', imgSrc: 'src/assets/Snowy.png' },
        { time: '3 pm', temp: '37&deg;', imgSrc: 'src/assets/Snowy.png' },
        { time: '4 pm', temp: '37&deg;', imgSrc: 'src/assets/Rainy.png' },
        { time: '5 pm', temp: '38&deg;', imgSrc: 'src/assets/Rainy.png' },
        { time: '6 pm', temp: '38&deg;', imgSrc: 'src/assets/Rainy.png' },
        { time: '7 pm', temp: '39&deg;', imgSrc: 'src/assets/Rainy.png' },
        { time: '8 pm', temp: '40&deg;', imgSrc: 'src/assets/Rainy.png' },
        { time: '9 pm', temp: '40&deg;', imgSrc: 'src/assets/Rainy.png' },
        { time: '10 pm', temp: '40&deg;', imgSrc: 'src/assets/Rainy.png' },
        { time: '11 pm', temp: '40&deg;', imgSrc: 'src/assets/Rainy.png' },
    ];

    // Data for the 7-day forecast (day, temperature range, and icon) 
    const secondContainerData = [
        { time: 'Today', temp: '29&deg-40&deg;', imgSrc: 'src/assets/snowy.png' },
        { time: 'Sat', temp: '40&deg-46&deg;', imgSrc: 'src/assets/Rainy.png' },
        { time: 'Sun', temp: '37&deg-49&deg;', imgSrc: 'src/assets/cloud.png' },
        { time: 'Mon', temp: '37&deg-57&deg;', imgSrc: 'src/assets/rainy.png' },
        { time: 'Tue', temp: '36&deg-54&deg;', imgSrc: 'src/assets/cloud.png' },
        { time: 'Wed', temp: '33&deg-39&deg;', imgSrc: 'src/assets/cloud.png' },
        { time: 'Thu', temp: '30&deg-43&deg;', imgSrc: 'src/assets/cloud.png' },
    ];

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
                            {isFirstContainerVisible ? (
                                // Render 12-hour forecast data
                                firstContainerData.map((data, index) => (
                                    <div key={index} className="rounded-rectangle-style">
                                        <span className="text-style">{data.time}</span>
                                        <img src={data.imgSrc} className="img-style" alt="Weather icon" />
                                        <span className="temp-style" dangerouslySetInnerHTML={{ __html: data.temp }} />
                                    </div>
                                ))
                            ) : (
                                // Render 7-day forecast data
                                secondContainerData.map((data, index) => (
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
