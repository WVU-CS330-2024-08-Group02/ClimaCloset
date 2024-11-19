import { useState } from "react"

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
    const handleChoice = (event) => {
        event.preventDefault();
        alert(`You selected: ${chosenOption.join(", ")}`);
    };

    // Create a form that has checkboxes where the user can "choose all that apply"
    return (
        <form onSubmit={handleChoice}>
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
            <button style={{backgroundColor: '#14b0db'}} type="submit">Submit Accessories</button>
        </form>
    );
}
