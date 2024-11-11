import { useState } from "react";

export function Shoes() {
  const [chosenOption, setChosenOption] = useState([]);
  const [hoveredOption, setHoveredOption] = useState(null); // Track which shoe is hovered
  const shoes = [
    { name: "Tennis Shoes", description: "Versatile shoes for sports or casual wear. This includes any sneakers you may have." },
    { name: "Boots", description: "Sturdy footwear for colder climates or rugged terrain. This includes rain boots, cowboy boots, and steel toe boots." },
    { name: "Flip Flops", description: "Casual footwear perfect for warm weather." },
    { name: "Sandals", description: "Open-toe footwear ideal for hot weather. This includes any type of open design shoe that is not a flip flop." },
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
    <form className="shoes" onSubmit={handleChoice}>
      <h3>Select All Types of Shoes You Own</h3>
      {shoes.map((option, index) => (
        <div
          key={index}
          onMouseEnter={() => setHoveredOption(option.name)} // Set hovered option
          onMouseLeave={() => setHoveredOption(null)} // Reset hovered option
          style={{ position: "relative" }}
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
        Submit Shoes
      </button>
    </form>
  );
}
