import { useState } from "react"

export function Accessories() {
    const [chosenOption, setChosenOption] = useState([]);
    const accessories = ["Sunglasses", "Hat", "Gloves", "Scarf", "Backpack", "Purse", "Umbrella"];

    const handleCheckboxes = (option) => {
        setChosenOption((prevCheckedOptions) =>
            prevCheckedOptions.includes(option)
                ? prevCheckedOptions.filter((o) => o !== option)
                : [...prevCheckedOptions, option]
        );
    };

    const handleChoice = (event) => {
        event.preventDefault();
        alert(`You selected: ${chosenOption.join(", ")}`);
    };

    return (
        <form onSubmit={handleChoice}>
            <h3>Select All Types of Accessories you Own</h3>
            {accessories.map((option, index) => (
                <div key={index}>
                    <input 
                        type="checkbox"
                        id={`checkbox-${index}`}
                        value={option}
                        checked={chosenOption.includes(option)}
                        onChange={() => handleCheckboxes(option)}
                    />
                    <label htmlFor={`checkbox-${index}`}>{option}</label>
                </div>
            ))}
            <button type="submit">Submit Accessories</button>
        </form>
    );
}
