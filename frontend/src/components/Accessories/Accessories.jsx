import { useState, useContext } from "react";
import axios from "axios";
import './Accessories.css';
import { AuthContext } from "../../context/AuthContext";

export function Accessories() {
    const { isLoggedIn, user } = useContext(AuthContext); // Use authentication context
    const [chosenOption, setChosenOption] = useState([]);

    // Store the types of accessories in an array
    const accessories = ["Sunglasses", "Hat", "Gloves", "Scarf", "Backpack", "Purse", "Umbrella"];

    // Handle the event when checkbox(es) are clicked by the user
    const handleCheckboxes = (option) => {
        setChosenOption((prevCheckedOptions) =>
            prevCheckedOptions.includes(option)
                ? prevCheckedOptions.filter((o) => o !== option)
                : [...prevCheckedOptions, option]
        );
    };

    // Handle displaying the choices that the user checked
    const handleChoice = async (event) => {
        event.preventDefault();
    
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
            const response = await axios.post('http://localhost:5001/closet/saveCloset', dataToSend, {
                headers: { 'Content-Type': 'application/json' },
            });

            alert('Accessories saved successfully');
        } catch (error) {
            console.error('Error submitting accessories:', error);
            alert('Failed to save accessories: ' + (error.response?.statusText || 'An error occurred.'));
        }
    };

    // Create a form that has checkboxes where the user can "choose all that apply"
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
