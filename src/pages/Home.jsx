import { useState } from "react";
import { Shelf } from "../components/Shelf";

export function Home() {
    const [activity, setActivity] = useState('casual'); // Default activity
    const [outfitSuggestion, setOutfitSuggestion] = useState(''); // State for outfit suggestion

    const handleActivityChange = (event) => {
        setActivity(event.target.value); // Update activity based on selection
    };

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

    const circleStyle = {
        width: '300px',
        height: '300px',
        backgroundColor: 'var(--lavender-blush)',
        borderRadius: '50%',
        margin: '20px auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'black',
        fontWeight: 'bold',
        fontSize: '60px',
        flexDirection: 'column'
    };

    const dropdownStyle = {
        width: '200px',
        height: '50px',
        fontSize: '20px',
        padding: '5px',
    };

    const dropdownLabel = {
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '10px',
    };

    return (
        <>
            <div>
                <h1>Hi Kaylea, welcome to your home page!</h1>
                <Shelf />

                <label htmlFor="activity-select" style={dropdownLabel}>
                    Choose an activity for the day:  </label>
                <select id="activity-select" value={activity} onChange={handleActivityChange} style={dropdownStyle}>
                    <option value="business">Business Professional</option>
                    <option value="active">Outdoor Activity</option>
                    <option value="indoor">Indoor Lounging</option>
                    <option value="casual">Casual/Low Activity</option>
                </select>

                <div style={{ marginTop: '10px' }}>
                <button onClick={generateOutfit} style={{ marginTop: '10px', fontSize: '20px', backgroundColor: '#14b0db' }}>
                    Generate Outfit
                </button>
                </div>

                {outfitSuggestion && (
                    <p style={{ marginTop: '20px', fontSize: '18px', fontWeight: 'bold' }}>
                        Suggested Outfit: {outfitSuggestion}
                    </p>
                )}
            </div>

            <div>
                <h1 style={ {marginTop: '150px' }}>The Weather Today</h1>
                <div style={circleStyle}>
                    <img style={{height: '120px', width: '120px'}} src="src/assets/sun.png"></img>
                    <span style={{marginTop: '-20px'}}>
                        70&deg; F
                    </span>
                </div>
                <p>in Morgantown, WV</p>
            </div>
        </>
    );
}
