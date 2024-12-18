import { useState } from "react"
import './WeatherPreferences.css'

export function WeatherPreferences() {
  const [temp, setTemp] = useState(50);
  const [hoveredOption, setHoveredOption] = useState(null); // State to track if hovered

  // Handle the event when user selects a value on the slider
  const handleChoice = (event) => {
    setTemp(event.target.value)
  }

  // Handle the event when the user lifts their mouse off of the slider
  const handleMouseUp = () => {
    alert(`Temperature Selected Is: ${temp}°F`)

    // Save the selected temperature to localStorage
     localStorage.setItem('idealTemperature', temp); 

  }
    
  // Show tooltip on hover
  const handleMouseEnter = () => {
    setHoveredOption(true);
  };

    // Hide tooltip when hover ends
    const handleMouseLeave = () => {
      setHoveredOption(false);
    };
    
  // Use a slider that ranges from 0 to 100 to get the user's ideal temperature (in degrees Fahrenheit)
  return (
    <div>
      <label>Select Ideal Temperature:<div className="question-icon" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>?</div>  <div></div>{temp}°F</label>
      <input type="range" min="0" max="100" value={temp} onChange={handleChoice} onMouseUp={handleMouseUp}/>
        
       {/* Tooltip Box, shown on hover */}
       {hoveredOption && (
        <div className="tooltip">
          The ideal temperature is defined as the temperature at which you would be comfortable wearing shorts and a short sleeve top.
        </div>
      )}

    </div>  
  )
}
