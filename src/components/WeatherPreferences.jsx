import { useState } from "react"
import '../components/WeatherPreferences.css'

export function WeatherPreferences() {
  const [temp, setTemp] = useState(50);
  const [showModal, setShowModal] = useState(false);

  // Handle the event when user selects a value on the slider
  const handleChoice = (event) => {
    setTemp(event.target.value)
  }

  // Handle the event when the user lifts their mouse off of the slider
  const handleMouseUp = () => {
    alert(`Temperature Selected Is: ${temp}°F`)
  }
    
  // Toggle modal visibility
  const handleClickQuestionMark = () => {
    setShowModal((prev) => !prev);
  };
    
  // Use a slider that ranges from 0 to 100 to get the user's ideal temperature (in degrees Fahrenheit)
  return (
      <div>
          <h1>Closet Settings/Preferences</h1>
          <label>Select Ideal Temperature:<div className="question-icon" onClick={handleClickQuestionMark}>?</div>  <div></div>{temp}°F</label>
          <input type="range" min="0" max="100" value={temp} onChange={handleChoice} onMouseUp={handleMouseUp}/>
        
    {/* Modal Box, this is a pop up on click to show ideal temp info */}
    {showModal && (
      <div className="modal">
        <div className="modal-content">
          <h2>Ideal Temperature Info</h2>
          <p>
            The ideal temperature is defined as the temperature at which you would be comfortable wearing shorts and a short sleeve top.
          </p>
          <button onClick={handleClickQuestionMark}>Close</button>
        </div>
      </div>
    )}

    </div>  
  )
}
