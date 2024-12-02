import { useState } from "react";
import './Bottoms.css'

export function Bottoms() {
  const [chosenOption, setChosenOption] = useState([]);
  const [hoveredOption, setHoveredOption] = useState(null); // State to track the hovered bottom
  // Store the types of bottoms and their respective desecriptions in an array
  const bottoms = [
    { name: "Jeans", description: "Durable and classic, great for casual or semi-formal wear." },
    { name: "Sweatpants", description: "Comfortable and relaxed, perfect for lounging." },
    { name: "Dress Pants", description: "Formal and sleek, ideal for professional settings." },
    { name: "Shorts", description: "Cool and casual, perfect for hot weather. We are counting capri as shorts." }
  ];

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
    <form className="bottoms" onSubmit={handleChoice}>
      <h3>Select All Types of Bottoms You Own</h3>
      {bottoms.map((option, index) => (
        <div
          key={index}
          onMouseEnter={() => setHoveredOption(option.name)} // Set hovered option
          onMouseLeave={() => setHoveredOption(null)} // Reset hovered option
        >
          <input
            type="checkbox"
            id={`checkbox2-${index}`}
            value={option.name}
            checked={chosenOption.includes(option.name)}
            onChange={() => handleCheckboxes(option.name)}
            aria-label={`Select ${option.name}`}
          />
          <label htmlFor={`checkbox2-${index}`}>{option.name}</label>

          {/* Show description when hovered */}
          {hoveredOption === option.name && (
            <div className = "description-tooltip">
              {option.description}
            </div>
          )}
        </div>
      ))}
      <button type="submit">
        Submit Bottoms
      </button>
    </form>
  );
}
