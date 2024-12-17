import { useState } from "react";
import axios from 'axios';
import './Shoes.css'

export function Shoes() {
  const [chosenOption, setChosenOption] = useState([]);
  const [hoveredOption, setHoveredOption] = useState(null); // Track which shoe is hovered
  // Store the types of shoes and their respective desecriptions in an array
  const shoes = [
    { name: "Tennis_Shoes", description: "Versatile shoes for sports or casual wear. This includes any sneakers you may have." },
    { name: "Boots", description: "Sturdy footwear for colder climates or rugged terrain. This includes rain boots, cowboy boots, and steel toe boots." },
    { name: "Flip_Flops", description: "Casual footwear perfect for warm weather." },
    { name: "Sandals", description: "Open-toe footwear ideal for hot weather. This includes any type of open design shoe that is not a flip flop." },
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
  const handleChoice = async (event) => {
    event.preventDefault();
    
    const userId = 1;
    
    // Create dataToSend with default values for all accessories
    const dataToSend = {
        Id: userId,
        ...shoes.reduce((s, shoe) => {
            s[shoe] = chosenOption.includes(shoe) ? 1 : 0;
            return s;
        }, {}),
    };

    try {
        const response = await axios.post('http://localhost:5001/closet/saveCloset', dataToSend, {
            headers: { 'Content-Type': 'application/json' },
        });

        alert('Shoes saved successfully: ' + JSON.stringify(response.data));
    } catch (error) {
        console.error('Error submitting shoes:', error);
        alert('Failed to save shoes: ' + (error.response?.statusText || 'An error occurred.'));
    }
  };

  // Create a form that has checkboxes where the user can "choose all that apply"
  return (
    <form className="shoes" onSubmit={handleChoice}>
      <h3>Select All Types of Shoes You Own</h3>
      {shoes.map((option, index) => (
        <div
          key={index}
          onMouseEnter={() => setHoveredOption(option.name)} // Set hovered option
          onMouseLeave={() => setHoveredOption(null)} // Reset hovered option
        >
          <input
            type="checkbox"
            id={`checkbox3-${index}`}
            value={option.name}
            checked={chosenOption.includes(option.name)}
            onChange={() => handleCheckboxes(option.name)}
            aria-label={`Select ${option.name}`}
          />
          <label htmlFor={`checkbox3-${index}`}>{option.name}</label>

          {/* Show description when hovered */}
          {hoveredOption === option.name && (
            <div className = "description-tooltip">
              {option.description}
            </div>
          )}
        </div>
      ))}
      <button type="submit">
        Submit Shoes
      </button>
    </form>
  );
}
