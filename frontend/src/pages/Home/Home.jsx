import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Shelf } from "../../components/Shelf/Shelf";
import { products } from "../../components/Shelf/Shelf";
import './Home.css';  // Import the CSS file
import { CenterContainer } from "../../components/CenterContainer/CenterContainer";
import { TransparentBox } from "../../components/TransparentBox/TransparentBox";


// Placeholder imports until logic for weather is created
import SunnyIcon from "../../assets/weatherIcons/Sun.png";
import StormyIcon from "../../assets/weatherIcons/Rainy.png"
import CloudyIcon from "../../assets/weatherIcons/Cloud.png"
import SunnyCloudyIcon from "../../assets/weatherIcons/Sun_and_Cloud.png"
import SnowyIcon from "../../assets/weatherIcons/Snowy.png"


export function Home() {
    const { isLoggedIn, user } = useContext(AuthContext); // Use authentication context
    const [activity, setActivity] = useState('casual'); // Default activity
    const [outfitSuggestion, setOutfitSuggestion] = useState([]); // State for outfit suggestion
    const [showModal, setShowModal] = useState(false); // State for showing modal
    const [errorMessage, setErrorMessage] = useState(''); // State for "not enough in closet" message

    const handleActivityChange = (event) => {
        setActivity(event.target.value); // Update activity based on selection
    };

     // Function to suggest an outfit from available products in the shelf
     const suggestOutfit = () => {
        let suggestedItems = [];
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


        // Suggest different items based on the selected activity
        products.forEach(category => {
            if (activity === 'casual') {
                // Casual: Choose lighter, everyday wear
                if (category.name === "Tops") {
                    suggestedItems.push(category.images[0]); // Short-sleeve or casual tops
                } else if (category.name === "Bottoms") {
                    suggestedItems.push(category.images[1]); // Shorts or jeans
                } else if (category.name === "Shoes") {
                    suggestedItems.push(category.images[0]); // Sneakers
                } else if (category.name === "Accessories") {
                    suggestedItems.push(category.images[0]); // Umbrella
                }
            } else if (activity === 'business') {
                // Formal: Choose more elegant clothing
                if (category.name === "Tops") {
                    suggestedItems.push(category.images[1]); // Coat
                } else if (category.name === "Bottoms") {
                    suggestedItems.push(category.images[0]); // Jeans or dress pants
                } else if (category.name === "Shoes") {
                    suggestedItems.push(category.images[2]); // Boots
                }
            } else if (activity === 'active') {
                // Sporty: Choose comfortable, activity wear
                if (category.name === "Tops") {
                    suggestedItems.push(category.images[0]); // Short sleeve
                } else if (category.name === "Bottoms") {
                    suggestedItems.push(category.images[1]); // Shorts
                } else if (category.name === "Shoes") {
                    suggestedItems.push(category.images[0]); // Sneakers
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
                            <img className="weather-img" src={SnowyIcon} alt="weather-icon" />
                            <span className="weather-temp">
                                34&deg; F
                            </span>
                        </div>
                        <p>in Morgantown, WV</p>
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
                                    {outfitSuggestion.map((item, index) => (
                                        <img key={index} src={item} alt={`Suggested Item ${index}`} className="suggested-item" />
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
