import { useState } from "react";

export function Bottoms() {
    const [chosenOption, setChosenOption] = useState([]);
    const bottoms = ["Jeans", "Sweatpants", "Dress Pants", "Shorts"];

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
        <form className="bottoms" onSubmit={handleChoice}>
            <h3>Select All Types of Bottoms you Own</h3>
            {bottoms.map((option, index) => (
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
            <button style={{backgroundColor: '#14b0db'}} type="submit">Submit Bottoms</button>
        </form>
    );
}