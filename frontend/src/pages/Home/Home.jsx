import axios from 'axios';
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Shelf } from "../../components/Shelf/Shelf";
import './Home.css';  // Import the CSS file
import { CenterContainer } from "../../components/CenterContainer/CenterContainer";
import { TransparentBox } from "../../components/TransparentBox/TransparentBox";
import coat from '../../assets/clothingIcons/Coat.png';
import jeans from '../../assets/clothingIcons/jeans.png';
import boots from '../../assets/clothingIcons/boots.png';
import umbrella from '../../assets/clothingIcons/umbrella.png';
import backpack from '../../assets/clothingIcons/Backpack.png'
import dressPants from '../../assets/clothingIcons/Dress_Pants.png'
import flipFlops from '../../assets/clothingIcons/flipFlops.png'
import gloves from '../../assets/clothingIcons/Gloves.png'
import jacket from '../../assets/clothingIcons/Jacket.png'
import longSleeves from '../../assets/clothingIcons/Long_Sleeve.png'
import purse from '../../assets/clothingIcons/Purse.png'
import shorts from '../../assets/clothingIcons/shorts.png'
import sweatpants from '../../assets/clothingIcons/Sweatpants.png'
import sweatshirt from '../../assets/clothingIcons/Sweatshirt.png'

// Placeholder imports until logic for weather is created
import SunnyIcon from "../../assets/weatherIcons/Sun.png";
import StormyIcon from "../../assets/weatherIcons/Stormy.png"
import CloudyIcon from "../../assets/weatherIcons/Cloud.png"
import SunnyCloudyIcon from "../../assets/weatherIcons/Sun_and_Cloud.png"
import SnowyIcon from "../../assets/weatherIcons/Snowy.png"
import RainyIcon from "../../assets/weatherIcons/PlaceholderRainy.png" // Placeholder Icon
import NightIcon from "../../assets/weatherIcons/Night.png" // Night icon
import DefaultIcon from "../../assets/ClosetLogo.png"

export function Home() {
    const { isLoggedIn, user } = useContext(AuthContext); // Use authentication context
    const [activity, setActivity] = useState('casual'); // Default activity
    const [outfitSuggestion, setOutfitSuggestion] = useState({ text: '', images: [] }); // State for outfit suggestion
    const [showModal, setShowModal] = useState(false); // State for showing modal
    const [position, setPosition]= useState([39.64591951232883, -79.97339559170358]);
    const [forecastHourly, setForecastHourly] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5001/weather/')  
            .then(response => {
                const { geoData, forecastHourly } = response.data;
    
                // Log the data received
                console.log("Received GeoData:", geoData);
                console.log("Received Hourly Forecast:", forecastHourly);
    
                // Set the location data from geoData
                setPosition([geoData.lat, geoData.lon]);
    
                // Safely set the forecast data
                if (forecastHourly && forecastHourly.length) {
                    setForecastHourly(forecastHourly);  // Hourly forecast
                } else {
                    console.error('Hourly forecast data is missing or empty');
                }
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
            });
    }, []);


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
        } else if (forecast.includes("Clear") || forecast.includes("Sunny")) {
            return SunnyIcon;
        } else if (forecast.isDaytime){ // If weather clear and is day
            return SunnyIcon;
        } else if (!forecast.isDaytime) { // If weather clear and is night
            return NightIcon
        } else {
            return DefaultIcon; // This should never happen
        }        
    };
    
    // Map hourly forecast data to display
    const hourlyForecastData = forecastHourly.map(hour => {
        const icon = getIconForForecast(hour.shortForecast);  
        return {
            time: hour.time,
            temp: `${hour.temperature}`,
            imgSrc: icon,
            forecast: hour.shortForecast, //Short description of the weather
        };
    });

    // Helper function to get current temperature for top right box
    const getCurrentTemperature = () => {
        if (!forecastHourly || !forecastHourly.length) return null;

        const currentHourForecast = forecastHourly[0];

        return currentHourForecast ? currentHourForecast.temperature : null;
    };
        
    const handleActivityChange = (event) => {
        setActivity(event.target.value); // Update activity based on selection
    };

    {/* outfit suggestions */}
    const generateOutfit = () => {
        let suggestion;
        let outfitImages = [];
        switch (activity) {
            case 'business':
                suggestion = "Dress shirt, blazer, and dress pants. Polo and khakis.";
                outfitImages = [coat, dressPants, boots, umbrella, purse]; // Example for multiple images
                break;
            case 'active':
                suggestion = "Athletic shirt and shorts, with sneakers. Leggings and an athletic shirt.";
                outfitImages = [longSleeves, shorts]; 
                break;
            case 'indoor':
                suggestion = "Comfortable loungewear or pajamas.";
                outfitImages = [sweatshirt, sweatpants];
                break;
            case 'casual':
                suggestion = "T-shirt and jeans. Shorts and a long sleeve.";
                outfitImages = [longSleeves, jeans, boots];
                break;
            default:
                suggestion = "Choose an activity to get an outfit suggestion.";
        }
        setOutfitSuggestion({ text: suggestion, images: outfitImages });
        setShowModal(true); // Show the modal with the suggestion
    };
    

        // Function to close the modal
        const closeModal = () => {
            setShowModal(false);
        };

    return (
        <>
            <h1>
                {isLoggedIn
                    ? `Hi ${user?.name || "there"}, welcome to your home page!`
                    : (
                        <>
                            Welcome to ClimaCloset!
                            <p>Please log in to access personalized features.</p>
                        </>
                )}
            </h1>
            
            <CenterContainer className="home-center-container">
                <div className="left-container">
                    <Shelf />
                </div>
                
                <div className="right-container">

                    {/* container for the weather on home page */}
                    <TransparentBox className="top-half">
                        <h1 className="weather-title">The Weather Today</h1>
                        <div className="circle">
                            <img className="weather-img" src={hourlyForecastData.imgSrc} alt="weather-icon" />
                            <span className="weather-temp">
                                {getCurrentTemperature() != null ? `${getCurrentTemperature()}` : "Loading..."}
                            </span>
                        </div>
                        <p>in Your Current Location</p>
                    </TransparentBox>

                    <TransparentBox className="bottom-half">

                        {/* button for the generate outfit */}
                        <label htmlFor="activity-select" className="dropdown-label">
                            Choose an activity for the day:
                        </label>
                        <select
                            id="activity-select"
                            value={activity}
                            onChange={handleActivityChange}
                            className="dropdown"
                            style={{position: "relative", width: "400px"}}
                        >
                            <option value="business">Business Professional</option>
                            <option value="active">Outdoor Activity</option>
                            <option value="indoor">Indoor Lounging</option>
                            <option value="casual">Casual/Low Activity</option>
                        </select>

                        <div className="button-container">
                            <button onClick={generateOutfit} className="button">
                                Generate Outfit
                            </button>
                        </div>

                        {/* Modal for Outfit Suggestion */}
                        {showModal && (
                        <div className={`modal ${outfitSuggestion.images.length > 2 ? 'large-modal' : 'small-modal'}`}>
                            <div className="modal-content">
                                {/* Close Button (X) */}
                                <span className="close" onClick={closeModal}>&times;</span>
                                <h2>Suggested Outfit</h2>
                                <p>{outfitSuggestion.text}</p>
                                <div className="outfit-images">
                                    {outfitSuggestion.images.map((image, index) => (
                                    <img 
                                        key={index}
                                        src={image} 
                                        alt={`Outfit suggestion ${index + 1}`} 
                                        className="outfit-image"
                                    />
                                    ))}
                                </div>
                            </div>
                        </div>
                        )}
                    </TransparentBox>
                </div>
            </CenterContainer>
        </>
    );
}
