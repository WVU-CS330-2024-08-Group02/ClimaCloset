import { useState } from "react";
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


export function Home() {
    const [activity, setActivity] = useState('casual'); // Default activity
    const [outfitSuggestion, setOutfitSuggestion] = useState({ text: '', images: [] }); // State for outfit suggestion
    const [showModal, setShowModal] = useState(false); // State for showing modal

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
