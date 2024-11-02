import { useState } from "react"

export function WeatherPreferences() {
    const [temp, setTemp] = useState(50)

    const handleChoice = (event) => {
        setTemp(event.target.value)
    }

    const handleMouseUp = () => {
        alert(`Temperature Selected Is: ${temp}°F`)
    }
    
    // Use a slider that ranges from 0 to 100 to get the user's ideal temperature (in degrees Fahrenheit)
    return (
        <div>
            <h1>Closet Settings/Preferences</h1>
            <label>Select Ideal Temperature:  {temp}°F</label>
            <input type="range" min="0" max="100" value={temp} onChange={handleChoice} onMouseUp={handleMouseUp}/>
        </div>  
    )
}
