import { useState, useContext } from "react";
import axios from 'axios';
import './Tops.css'
import { AuthContext } from "../../context/AuthContext";

export function Tops() {
  const { isLoggedIn, user } = useContext(AuthContext); // Use authentication context
  const [chosenOption, setChosenOption] = useState([]);
  const [hoveredOption, setHoveredOption] = useState(null); // State to track the hovered shirt
  // Store the types of tops and their respective desecriptions in an array
  const tops = [
    { name: "Short Sleeve", description: "Any top with sleeves covering your shoulders." },
    { name: "Long Sleeve", description: "Sleeves cover your entire arm till your wrist." },
    { name: "Flannel", description: "A button up top with a collar typically in a plaid pattern." },
    { name: "Tank Top", description: "A sleeveless shirt ideal for hot weather or layering." },
    { name: "Sweater", description: "A knitted love sleeve top, typically worn for warmth." },
    { name: "Sweatshirt", description: "A casual, long-sleeve shirt made from soft, warm fabric." },
    { name: "Jacket", description: "A lightweight or heavy outerwear garment for layering." },
    { name: "Coat", description: "A thick outer garment worn to protect against cold weather." },
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
    
    const userId = user?.id;
    
    // Create dataToSend with default values for all accessories
    const dataToSend = {
        Id: userId,
        ...tops.reduce((acc, top) => {
            acc[top.name.replace(" ", "_")] = chosenOption.includes(top.name) ? 1 : 0;
            return acc;
        }, {}),
    };

    try {
        const response = await axios.post('http://localhost:5001/closet/saveCloset', dataToSend, {
            headers: { 'Content-Type': 'application/json' },
        });

        alert('Tops saved successfully');
    } catch (error) {
        console.error('Error submitting tops:', error);
        alert('Failed to save tops: ' + (error.response?.statusText || 'An error occurred.'));
    }
  };

  // Create a form that has checkboxes where the user can "choose all that apply"
  return (
    <form className="tops" onSubmit={handleChoice}>
      <h3>Select All Types of Tops You Own</h3>
      
       
        {tops.map((option, index) => (
          <div key={index} 
            onMouseEnter={() => setHoveredOption(option.name)} // Set hovered option
            onMouseLeave={() => setHoveredOption(null)} // Reset hovered option
          >
            <input
              type="checkbox"
              id={`checkbox1-${index}`}
              value={option.name}
              checked={chosenOption.includes(option.name)}
              onChange={() => handleCheckboxes(option.name)}
              aria-label={`Select ${option.name}`}
            />
            <label htmlFor={`checkbox1-${index}`}>{option.name}</label>

            {/* Show description when hovered */}
            {hoveredOption === option.name && (
              <div className = "description-tooltip">
                {option.description}
              </div>
            )}
          </div>
        ))}
     
      <button type="submit"> 
        Submit Tops
      </button>
    </form>
  );
}
