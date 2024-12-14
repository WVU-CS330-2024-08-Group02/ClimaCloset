import axios from 'axios';
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Shelf } from "../../components/Shelf/Shelf";
import { products } from "../../components/Shelf/Shelf";
import './Home.css';  // Import the CSS file
import { CenterContainer } from "../../components/CenterContainer/CenterContainer";
import { TransparentBox } from "../../components/TransparentBox/TransparentBox";
import Throbber from '../../components/Throbber/Throbber';


// Placeholder imports until logic for weather is created
import SunnyIcon from "../../assets/weatherIcons/Sun.png";
import StormyIcon from "../../assets/weatherIcons/Stormy.png"
import CloudyIcon from "../../assets/weatherIcons/Cloud.png"
import SunnyCloudyIcon from "../../assets/weatherIcons/Sun_and_Cloud.png"
import SnowyIcon from "../../assets/weatherIcons/Snowy.png"
import RainyIcon from "../../assets/weatherIcons/Rain.png" // Placeholder Icon
import NightIcon from "../../assets/weatherIcons/Night.png" // Night icon
import DefaultIcon from "../../assets/ClosetIcon.ico"

export function Home() {
    const { isLoggedIn, user } = useContext(AuthContext); // Use authentication context
    const [activity, setActivity] = useState('casual'); // Default activity
    const [outfitSuggestion, setOutfitSuggestion] = useState([]); // State for outfit suggestion
    const [showModal, setShowModal] = useState(false); // State for showing modal
    const [errorMessage, setErrorMessage] = useState(''); // State for "not enough in closet" message
    const [position, setPosition]= useState([39.64591951232883, -79.97339559170358]);
    const [forecastHourly, setForecastHourly] = useState([]);
    const [idealTemperature, setIdealTemperature] = useState(null); // Example default value


    useEffect(() => {
        // Retrieve the ideal temperature from localStorage when the component loads
        const savedIdealTemperature = localStorage.getItem('idealTemperature');
        if (savedIdealTemperature) {
            setIdealTemperature(parseInt(savedIdealTemperature, 10)); // Convert the string to an integer
        }
        
        //retrieve weather data
        axios.get('http://135.237.82.214:5000/weather/')  
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


    // Helper function to determine if it's warm or cold based on current temperature and ideal temperature
    function isWarmWeather() {
        const currentTemp = getCurrentTemperature();
        return currentTemp >= idealTemperature;
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


    // Helper function to check if there is precipitation in the forecast
    function hasPrecipitation(forecast) {
        const precipKeywords = ["Rain", "Snow", "Storm", "Shower"]; // Keywords for precipitation
        return precipKeywords.some(keyword => forecast.includes(keyword));
    }
    

    // Helper function to get current temperature for top right box
    const getCurrentTemperature = () => {
        if (!forecastHourly || !forecastHourly.length) return null;

        const currentHourForecast = forecastHourly[0];

        return currentHourForecast ? currentHourForecast.temperature : null;
    };
        
    const handleActivityChange = (event) => {
        setActivity(event.target.value); // Update activity based on selection
    };

     // Function to suggest an outfit from available products in the shelf
     const suggestOutfit = () => {
        let suggestedItems = [];
        const warmWeather = isWarmWeather();
        let hasEnoughItems = true; // Flag to track if we have enough items in each category

        // Check if we have enough items for each category
        products.forEach(category => {
            if (category.images.length === 0) {
                hasEnoughItems = false;
            }
        });

        // If not enough items, show error message
        if (!hasEnoughItems) {
            setErrorMessage("You don't have enough in your closet.");
            setShowModal(false); // Ensure modal doesn't show
            return;
        }

        // Reset the error message if there are enough items
        setErrorMessage('');

        // Check if there is precipitation in the current forecast
        const currentForecast = forecastHourly[0]?.shortForecast || ""; // Get the current hour's forecast
        const isPrecipitating = hasPrecipitation(currentForecast);
        
        // If there is precipitation, suggest rain-related items
        if (isPrecipitating) {
             suggestedItems.push("Umbrella", "Rain Jacket");
        }
        

        // Suggest different items based on the selected activity
        products.forEach(category => {
            //suggest outfit if weather warm
            if (warmWeather){
                if (activity === 'casual') {
                    if (category.name === "Tops") {
                        suggestedItems.push("Short Sleeve or Tank Top");
                    } else if (category.name === "Bottoms") {
                        suggestedItems.push("Shorts");
                    } else if (category.name === "Shoes") {
                        suggestedItems.push("Sandals");
                    } else if (category.name === "Accessories") {
                        suggestedItems.push("Purse");
                    }
                } else if (activity === 'business') {
                    // Formal: Choose more elegant clothing
                    if (category.name === "Tops") {
                        suggestedItems.push("Short Sleeve"); // Coat
                    } else if (category.name === "Bottoms") {
                        suggestedItems.push("Dress Pants"); // Jeans or dress pants
                    } else if (category.name === "Shoes") {
                        suggestedItems.push("Tennis Shoes"); // Boots
                    }
                } else if (activity === 'active') {
                    // Sporty: Choose comfortable, activity wear
                    if (category.name === "Tops") {
                        suggestedItems.push("Tank Top"); // Short sleeve
                    } else if (category.name === "Bottoms") {
                        suggestedItems.push("Shorts"); // Shorts
                    } else if (category.name === "Shoes") {
                        suggestedItems.push("Tennis Shoes"); // Sneakers
                    }
                } else if (activity === 'indoor') {
                    // Sporty: Choose comfortable, activity wear
                    if (category.name === "Tops") {
                        suggestedItems.push("Tank Top"); // Short sleeve
                    } else if (category.name === "Bottoms") {
                        suggestedItems.push("Shorts"); // Shorts
                    }
                }
            } 
            //suggest different outfit is weather cool
            else{
                if (activity === 'casual') {
                    if (category.name === "Tops") {
                        suggestedItems.push("Long Sleeve or Sweater");
                    } else if (category.name === "Bottoms") {
                        suggestedItems.push("Jeans");
                    } else if (category.name === "Shoes") {
                        suggestedItems.push("Boots");
                    } else if (category.name === "Accessories") {
                        suggestedItems.push("Hat");
                    }
                } else if (activity === 'business') {
                    // Formal: Choose more elegant clothing
                    if (category.name === "Tops") {
                        suggestedItems.push("Coat"); // Coat
                    } else if (category.name === "Bottoms") {
                        suggestedItems.push("Dress Pants"); // Jeans or dress pants
                    } else if (category.name === "Shoes") {
                        suggestedItems.push("Boots"); // Boots
                    }
                } else if (activity === 'active') {
                    // Sporty: Choose comfortable, activity wear
                    if (category.name === "Tops") {
                        suggestedItems.push("Long Sleeves"); // Short sleeve
                    } else if (category.name === "Bottoms") {
                        suggestedItems.push("Sweatpants"); // Shorts
                    } else if (category.name === "Shoes") {
                        suggestedItems.push("Tennis Shoes"); // Sneakers
                    }
                }  else if (activity === 'indoor') {
                    // Sporty: Choose comfortable, activity wear
                    if (category.name === "Tops") {
                        suggestedItems.push("Sweatshirt"); // Short sleeve
                    } else if (category.name === "Bottoms") {
                        suggestedItems.push("Sweatpants"); // Shorts
                    }
                }
            }
        });


        // Set the outfit suggestion and show modal
        setOutfitSuggestion(suggestedItems);
        setShowModal(true);
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
                            <img className="weather-img" src={hourlyForecastData[0]?.imgSrc || <Throbber/>} alt="weather-icon" />
                            <span className="weather-temp">
                                {getCurrentTemperature() != null ? `${getCurrentTemperature()}` : <Throbber/>}
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
                            <button onClick={suggestOutfit} className="button">
                                Generate Outfit
                            </button>
                        </div>

                    {/* Modal that shows the outfit suggestion */}
                    {showModal && (
                        <div className="modal">
                            <div className="modal-content">
                                <span className="close" onClick={closeModal}>&times;</span>
                                <h2>Your Suggested Outfit</h2>
                                <div className="suggested-items">
                                    {Object.keys(outfitSuggestion).map((category, index) => (
                                        <p key={index}> {outfitSuggestion[category]}</p> /* Display items on the same line */
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
