import { useState } from "react"

export function WeatherPreferences() {
    const [temp, setTemp] = useState(50);
    const [showModal, setShowModal] = useState(false);

    // Handle the even when user selects a value on the slider
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
        
        {/* Modal Box */}
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
        
        <style jsx>{`
        label {
          position: relative;
          font-size: 18px;
          cursor: pointer;
        }

        input[type="range"] {
          margin-top: 10px;
        }

        .question-icon {
          display: inline-flex;
          justify-content: center;
          align-items: center;
          width: 20px;
          height: 20px;
          background-color: grey;
          color: white;
          border-radius: 50%;
          font-size: 12px;
          margin-left: 10px;
          cursor: pointer;
          font-weight: bold;
        }

        .modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 100;
        }

        .modal-content {
          background-color: white;
          padding: 20px;
          border-radius: 5px;
          max-width: 500px;
          width: 80%;
          text-align: center;
        }

        .modal button {
          margin-top: 20px;
          padding: 10px 20px;
          font-size: 16px;
          background-color: #007BFF;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }

        .modal button:hover {
          background-color: #0056b3;
        }
        `}
      </style>
        </div>  
    )
}
