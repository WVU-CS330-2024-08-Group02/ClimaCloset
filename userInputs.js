import React from "react";
import { useState } from "react";

export function WeatherPreferencesForm() {
    const [chosenOption, setChosenOption] = useState("");

    const choices = ["I like to be cold", "I like to be hot", "I am in the middle"];

    const handleChoice = (event) => {
        event.preventDefault();
        alert("You selected: ${chosenOption}");
    };

    return (
        <form onSubmit={handleChoice}>
            <label html="dropdown">Choose a weather preference:</label>
            <select 
                id="dropdown" 
                value={chosenOption} 
                onChange={(e) => setChosenOption(e.target.value)} 
                required
            >
                <option value="" disabled>
                    -- Select Your Weather Preference --
                </option>
                {choices.map((choice, index) => (
                <option key={index} value={choice}>
                    {choice}
                </option>
                ))}
            </select>
            <button type="submit"Save></button>
        </form>
    );
}

export function ShirtTypesForm() {
    const [chosenOption, setChosenOption] = useState("");
    const shirts = ["Short Sleeve", "Long Sleeve", "Flannel", "Tank Top", "Sweatshirt", "Jacket", "Coat"];
    
    const handleCheckboxes = (option) => {
        setChosenOption((prevCheckedOptions) =>
            prevCheckedOptions.includes(option)
                ? prevCheckedOptions.filter((o) => o !== option)
                : [...prevCheckedOptions, option]
        );
    };

    const handleChoice = (event) => {
        event.preventDefault();
        alert("You selected: ${chosenOption.join(", ")}");
    };

    return (
        <form onSubmit={handleChoice}>
            <h3>Select All Types of Shirts you Own</h3>
            {shirts.map((option, index) => (
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
            <button type="submit">Submit Shirts</button>
        </form>
    );
}

export function PantsTypesForm() {
    const [chosenOption, setChosenOption] = useState("");
    const pants = ["Jeans", "Sweatpants", "Shorts"];

    const handleCheckboxes = (option) => {
        setChosenOption((prevCheckedOptions) =>
            prevCheckedOptions.includes(option)
                ? prevCheckedOptions.filter((o) => o !== option)
                : [...prevCheckedOptions, option]
        );
    };

    const handleChoice = (event) => {
        event.preventDefault();
        alert("You selected: ${chosenOption.join(", ")}");
    };

    return (
        <form onSubmit={handleChoice}>
            <h3>Select All Types of Pants you Own</h3>
            {pants.map((option, index) => (
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
            <button type="submit">Submit Pants</button>
        </form>
    );
}

export function ShoeTypesForm() {
    const [chosenOption, setChosenOption] = useState("");
    const shoes = ["Tennis Shoes", "Flip Flops", "Sandals"];
  
    const handleCheckboxes = (option) => {
        setChosenOption((prevCheckedOptions) =>
            prevCheckedOptions.includes(option)
                ? prevCheckedOptions.filter((o) => o !== option)
                : [...prevCheckedOptions, option]
        );
    };

    const handleChoice = (event) => {
        event.preventDefault();
        alert("You selected: ${chosenOption.join(", ")}");
    };

    return (
        <form onSubmit={handleChoice}>
            <h3>Select All Types of Shoes you Own</h3>
            {shoes.map((option, index) => (
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
            <button type="submit">Submit Shoes</button>
        </form>
    );
}

export function AccessoryTypesForm() {
    const [chosenOption, setChosenOption] = useState("");
    const accessories = ["Earrings", "Sunglasses", "Hat", "Gloves", "Scarf"];

    const handleCheckboxes = (option) => {
        setChosenOption((prevCheckedOptions) =>
            prevCheckedOptions.includes(option)
                ? prevCheckedOptions.filter((o) => o !== option)
                : [...prevCheckedOptions, option]
        );
    };

    const handleChoice = (event) => {
        event.preventDefault();
        alert("You selected: ${chosenOption.join(", ")}");
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

