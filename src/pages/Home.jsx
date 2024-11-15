import { useState } from "react";
import { Shelf } from "../components/Shelf";
import './Home.css';  // Import the CSS file
import { CenterContainer } from "../components/CenterContainer";
import { TransparentBox } from "../components/TransparentBox";

export function Home() {
    const [activity, setActivity] = useState('casual'); // Default activity
    const [outfitSuggestion, setOutfitSuggestion] = useState(''); // State for outfit suggestion

    const handleActivityChange = (event) => {
        setActivity(event.target.value); // Update activity based on selection
    };

    {/* outfit suggestions */}
    const generateOutfit = () => {
        let suggestion;
        switch (activity) {
            case 'business':
                suggestion = "Dress shirt, blazer, and dress pants. Polo and kahkis.";
                break;
            case 'active':
                suggestion = "Athletic shirt and shorts, with sneakers. Leggings and an athletic shirt.";
                break;
            case 'indoor':
                suggestion = "Comfortable loungewear or pajamas.";
                break;
            case 'casual':
                suggestion = "T-shirt and jeans. Shorts and a long sleeve.";
                break;
            default:
                suggestion = "Choose an activity to get an outfit suggestion.";
        }
        setOutfitSuggestion(suggestion);
    };

    return (
        <CenterContainer>
            <div>
                <h1>Hi Kaylea, welcome to your home page!</h1>
            </div>

            {/* insert shelf component */}
            <TransparentBox className='shelf-box'>
                <Shelf />
            </TransparentBox>

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

            {outfitSuggestion && (
                <p className="outfit-suggestion">
                    Suggested Outfit: {outfitSuggestion}
                </p>
            )}
            
            {/* container for thw weather on home page */}
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
        </CenterContainer>
    );
}
