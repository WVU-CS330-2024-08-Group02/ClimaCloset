/**
 * This file allows the user to select the different accessories they own,
 * save their selected options, and save them to the server in their closet.
 * When outfits are generated, the app will be able to use the accessories stored.
 */

// Import libraries and modules 
import { useState, useContext } from "react";
import axios from "axios";
import './Accessories.css';
import { AuthContext } from "../../context/AuthContext";

// Define the Accessories component
export function Accessories() {
    // Access authentication state
    const { isLoggedIn, user } = useContext(AuthContext);

    // State to store selected accessories 
    const [chosenOption, setChosenOption] = useState([]);

    // Store the types of accessories in an array
    const accessories = ["Sunglasses", "Hat", "Gloves", "Scarf", "Backpack", "Purse", "Umbrella"];

    // Handle event when a checkbox is clicked
    const handleCheckboxes = (option) => {
        setChosenOption((prevCheckedOptions) =>
            prevCheckedOptions.includes(option)
                ? prevCheckedOptions.filter((o) => o !== option)
                : [...prevCheckedOptions, option]
        );
    };

    // Handle form submission
    const handleChoice = async (event) => {
        event.preventDefault();
    
        // Fetch user ID 
        const userId = user?.id;
    
        // Create dataToSend with default values for all accessories
        const dataToSend = {
            Id: userId,
            ...accessories.reduce((acc, accessory) => {
                acc[accessory] = chosenOption.includes(accessory) ? 1 : 0;
                return acc;
            }, {}),
        };
    
        try {
            // Send selected accessories to the server 
            const response = await axios.post('http://localhost:5001/closet/saveCloset', dataToSend, {
                headers: { 'Content-Type': 'application/json' },
            });

            // Return successful response
            alert('Accessories saved successfully');

        // Error handling message if storing accessories fails
        } catch (error) {
            console.error('Error submitting accessories:', error);
            alert('Failed to save accessories: ' + (error.response?.statusText || 'An error occurred.'));
        }
    };

    // Create an accessories form listing the accessories in a checkbox format
    return (
        <form className="accessories" onSubmit={handleChoice}>
            <h3>Select All Types of Accessories you Own</h3>
            {accessories.map((option, index) => (
                <div key={index}>
                    <input 
                        type="checkbox"
                        id={`checkbox4-${index}`}
                        value={option}
                        checked={chosenOption.includes(option)}
                        onChange={() => handleCheckboxes(option)}
                    />
                    <label htmlFor={`checkbox4-${index}`}>{option}</label>
                </div>
            ))}
            <button type="submit">
                Submit Accessories
            </button>
        </form>
    );
}
