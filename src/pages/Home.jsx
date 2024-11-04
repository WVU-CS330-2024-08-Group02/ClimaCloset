import { useState } from "react"
import { Shelf } from "../components/Shelf"

export function Home()  {

    const [activity, setActivity] = useState('casual'); // Default unit is Fahrenheit

    const handleActivityChange = (event) => {
        setActivity(event.target.value); // Update unit based on selection
    };
    const circleStyle = {
        width: '300px',         // Circle width
        height: '300px',        // Circle height
        backgroundColor: 'lightblue', // Circle color
        borderRadius: '50%',     // Makes it a circle
        margin: '20px auto',      // Centers the circle
        display: 'flex',         // Enables flexbox
        alignItems: 'center',    // Vertically centers the text
        justifyContent: 'center', // Horizontally centers the text
        color: 'black',          // Text color
        fontWeight: 'bold',      // Text weight
        fontSize: '60px',        // Increase font size here
    };


    const dropdownStyle = {
        width: '200px', // Set the width of the dropdown
        height: '50px', //Set the height of the dorpdown box
        fontSize: '20px', // Set the text size
        padding: '5px', // Add some padding
    };

    const dropdownLabel = {
        fontSize: '20px',  // Adjust font size as needed
        //fontWeight: 'bold', // Make the text bold
        marginBottom: '10px', // Add some space below the label
    };

    return (
        <>
        <div>
            <h1>Hi, (insert name)! Welcome to your home page.</h1>
            <Shelf />

            <label htmlFor="activity-select" style={dropdownLabel}>Choose an activity for the day: </label>
                <select id="activity-select" value={activity} onChange={handleActivityChange}  style={dropdownStyle}>
                    <option value="business">Business Professional</option>
                    <option value="active">Outdoor Activity</option>
                    <option value="indoor">Indoor Lounging</option>
                    <option value="casual">Casual/Low Activity</option>
                </select>
        </div>

        <div>
            <h1>The Weather Today</h1>
            <div style={circleStyle}>
                <span>70&deg; F</span>
            </div>
            <p>in Morgantown, WV</p>
        </div>
        </>
    )
}
