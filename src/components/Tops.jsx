import { useState } from "react"

export function Tops() {
    const [chosenOption, setChosenOption] = useState([]);
    const tops = ["Short Sleeve", "Long Sleeve", "Flannel", "Tank Top", "Sweater", "Sweatshirt", "Jacket", "Coat"];
    
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
        <form className="tops" onSubmit={handleChoice}>
            <h3>Select All Types of Tops you Own</h3>
            {tops.map((option, index) => (
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
            <button style={{backgroundColor: '#14b0db'}} type="submit">Submit Tops</button>
        </form>
    );
}