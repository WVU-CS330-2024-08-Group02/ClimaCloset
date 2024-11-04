import { useState } from "react"
import { Shelf } from "../components/Shelf"

export function Home()  {

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

    return (
        <>
        <div>
            <h1>This is the home page</h1>
            <Shelf />
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
