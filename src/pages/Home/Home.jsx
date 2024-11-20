import { useState } from "react";
import { Shelf } from "../../components/Shelf/Shelf";
import './Home.css';  // Import the CSS file
import { CenterContainer } from "../../components/CenterContainer/CenterContainer";
import { TransparentBox } from "../../components/TransparentBox/TransparentBox";

export function Home() {
    const [activity, setActivity] = useState('casual'); // Default activity
    const [outfitSuggestion, setOutfitSuggestion] = useState(''); // State for outfit suggestion
    const [showModal, setShowModal] = useState(false); // State for showing modal

    const handleActivityChange = (event) => {
        setActivity(event.target.value); // Update activity based on selection
    };

    {/* outfit suggestions */}
    const generateOutfit = () => {
        let suggestion;
        let outfitImage;
        switch (activity) {
            case 'business':
                suggestion = "Dress shirt, blazer, and dress pants. Polo and kahkis.";
                outfitImage = "business.jpg"; // Path to your image for business attire
                break;
            case 'active':
                suggestion = "Athletic shirt and shorts, with sneakers. Leggings and an athletic shirt.";
                outfitImage = "active.jpg"; // Path to your image for active attire
                break;
            case 'indoor':
                suggestion = "Comfortable loungewear or pajamas.";
                outfitImage = "indoor.jpg"; // Path to your image for indoor attire
                break;
            case 'casual':
                suggestion = "T-shirt and jeans. Shorts and a long sleeve.";
                outfitImage = "casual.jpg"; // Path to your image for casual attire
                break;
            default:
                suggestion = "Choose an activity to get an outfit suggestion.";
        }
        setOutfitSuggestion({ text: suggestion, image: outfitImage });
        setShowModal(true); // Show the modal with the suggestion
    };

        // Function to close the modal
        const closeModal = () => {
            setShowModal(false);
        };

    return (
        <>
            <h1>Hi Kaylea, welcome to your home page!</h1>
            
            <CenterContainer className="home-center-container">
                <div className="left-container">
                    <Shelf />
                </div>
                
                <div className="right-container">
                    {/* button for the generate outfit */}
                    <label htmlFor="activity-select" className="dropdown-label">
                        Choose an activity for the day:
                    </label>
                    <select
                        id="activity-select"
                        value={activity}
                        onChange={handleActivityChange}
                        className="dropdown"
                        style={{position: "relative"}}
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
                        <div className="modal">
                            <div className="modal-content">
                                {/* Close Button (X) */}
                                <span className="close" onClick={closeModal}>&times;</span>
                                <h2>Suggested Outfit</h2>
                                <p>{outfitSuggestion.text}</p>
                                <img 
                                    src={`src/assets/${outfitSuggestion.image}`} 
                                    alt="Outfit suggestion" 
                                    className="outfit-image"
                                />
                            </div>
                        </div>
                    )}
            
                    {/* container for the weather on home page */}
                    <div>
                        <h1 className="weather-title">The Weather Today</h1>
                        <div className="circle">
                            <img className="weather-img" src="src/assets/sun.png" alt="weather-icon" />
                            <span className="weather-temp">
                                70&deg; F
                            </span>
                        </div>
                        <p>in Morgantown, WV</p>
                    </div>
                </div>
                
            </CenterContainer>
        </>
    );
}
