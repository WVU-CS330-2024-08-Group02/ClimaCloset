import { useState } from "react";

export function Tops() {
  const [chosenOption, setChosenOption] = useState([]);
  const [hoveredOption, setHoveredOption] = useState(null); // State to track the hovered shirt
  const tops = [
    { name: "Short Sleeve", description: "A light and breathable top for warm weather." },
    { name: "Long Sleeve", description: "Perfect for cooler temperatures, provides more coverage." },
    { name: "Flannel", description: "A cozy and warm shirt, often made of cotton or wool." },
    { name: "Tank Top", description: "A sleeveless shirt ideal for hot weather or layering." },
    { name: "Sweater", description: "A knitted top, typically worn for warmth." },
    { name: "Sweatshirt", description: "A casual, long-sleeve shirt made from soft, warm fabric." },
    { name: "Jacket", description: "A lightweight or heavy outerwear garment for layering." },
    { name: "Coat", description: "A thick outer garment worn to protect against cold weather." },
  ];

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
      <h3>Select All Types of Tops You Own</h3>
      <fieldset>
        <legend>Types of Tops</legend>
        {tops.map((option, index) => (
          <div key={index}
            onMouseEnter={() => setHoveredOption(option.name)} // Set hovered option
            onMouseLeave={() => setHoveredOption(null)} // Reset hovered option
            style={{ position: "relative" }}
          >
            <input
              type="checkbox"
              id={`checkbox-${index}`}
              value={option.name}
              checked={chosenOption.includes(option.name)}
              onChange={() => handleCheckboxes(option.name)}
              aria-label={`Select ${option.name}`}
            />
            <label htmlFor={`checkbox-${index}`}>{option.name}</label>

            {/* Show description when hovered */}
            {hoveredOption === option.name && (
              <div
                style={{
                  position: "absolute",
                  top: "30px",
                  left: "0",
                  backgroundColor: "#fff",
                  padding: "10px",
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  zIndex: "100",
                  width: "200px",
                }}
              >
                {option.description}
              </div>
            )}
          </div>
        ))}
      </fieldset>
      <button style={{ backgroundColor: "#14b0db" }} type="submit">
        Submit Tops
      </button>
    </form>
  );
}
