import { useState } from "react";

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
          style={{ position: "relative" }}
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
      <button style={{ backgroundColor: "#14b0db" }} type="submit">
        Submit Bottoms
      </button>
    </form>
  );
}
