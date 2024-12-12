import { useState } from "react"
import './Accessories.css'

export function Accessories() {
    const [chosenOption, setChosenOption] = useState([]);

    // Store the types of shoes and their respective desecriptions in an array
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
    
        // Hardcoded user Id for this example
        const userId = 1;
    
        // Convert chosen options into an object to send to the backend
        const dataToSend = {
            Id: userId, // Hardcoded Id
        };
    
        // Add chosen accessories with values indicating ownership
        chosenOption.forEach(option => {
            dataToSend[option] = 1; // '1' indicates the accessory is owned
        });
    
        // Prepare the API request
        try {
            const response = await fetch('http://localhost:5001/closet/saveCloset', { // Update URL if needed
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });
    
            // Handle the response
            if (response.ok) {
                const result = await response.json();
                alert('Accessories saved successfully: ' + JSON.stringify(result));
            } else {
                alert('Failed to save accessories: ' + response.statusText);
            }
        } catch (error) {
            console.error('Error submitting accessories:', error);
            alert('An error occurred while submitting the accessories.');
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
            ))}would 
            <button type="submit">
                Submit Accessories
            </button>
        </form>
    );
}
