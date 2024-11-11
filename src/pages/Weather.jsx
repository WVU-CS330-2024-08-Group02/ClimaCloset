import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../pages/Weather.css';

const circleStyle = {
    width: '300px',
    height: '300px',
    borderRadius: '50%',
    backgroundColor: 'transparent',
    border: '15px solid black',
    margin: '20px auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '120px',
};

const roundedRectangleStyle = {
    width: '160px',
    height: '250px',
    borderRadius: '200px',
    backgroundColor: '#00000030',
    border: '10px solid black',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '40px',
    textAlign: 'center',
    marginRight: '20px',
    flex: '0 0 auto',
};

const containerWrapperStyle = {
    display: 'flex',
    overflowX: 'auto',
    whiteSpace: 'nowrap',
    alignItems: 'center',
    width: '100%',
    maxWidth: '900px',
    height: 'auto',
    margin: '0 auto',
    paddingBottom: '0 10px',
};

const imgStyle = {
    width: '100px',
    height: '100px',
    objectFit: 'cover',
    marginBottom: '10px',
};

const textStyle = {
    fontSize: '40px',
    color: 'white',
    fontWeight: 'bold',
};

const tempStyle = {
    ...textStyle,
    marginTop: '-20px',
}

const mapContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    maxWidth: '1000px',
    height: '500px',
    margin: '20px auto',
};

function getColor(value) {
    if (value <= 40) {
        return 'lightblue';
    } else if (value <= 60) {
        return '#FFEB3B';
    } else if (value <= 90) {
        return 'orange';
    } else {
        return '#CD5C5C';
    }
}

function ProgressBar({ value, min, max }) {
    const progress = ((value - min) / (max - min)) * 100;

    const containerStyle = {
        width: '600px',
        height: '20px',
        backgroundColor: '#e0e0e0',
        borderRadius: '10px',
        overflow: 'hidden',
    };

    const progressStyle = {
        width: `${Math.min(Math.max(progress, 0), 100)}%`,
        height: '100%',
        backgroundColor: getColor(value),
        borderRadius: '10px 0 0 10px',
        transition: 'width 0.3s ease, background-color 0.3s ease',
    };

    return (
        <div style={containerStyle}>
            <div style={progressStyle}></div>
        </div>
    );
}

export function Weather() {
    const position = [39.64591951232883, -79.97339559170358];
    
    const [isFirstContainerVisible, setIsFirstContainerVisible] = useState(true);

    const toggleContainer = () => {
        setIsFirstContainerVisible(!isFirstContainerVisible);
    };

    const firstContainerData = [
        { time: 'Now', temp: '70&deg;', imgSrc: 'src/assets/Sun.png' },
        { time: '3 pm', temp: '68&deg;', imgSrc: 'src/assets/Sun.png' },
        { time: '4 pm', temp: '67&deg;', imgSrc: 'src/assets/Sun.png' },
        { time: '5 pm', temp: '65&deg;', imgSrc: 'src/assets/Sun.png' },
        { time: '6 pm', temp: '63&deg;', imgSrc: 'src/assets/Sun.png' },
        { time: '7 pm', temp: '60&deg;', imgSrc: 'src/assets/cloud.png' },
        { time: '8 pm', temp: '57&deg;', imgSrc: 'src/assets/cloud.png' },
        { time: '9 pm', temp: '57&deg;', imgSrc: 'src/assets/cloud.png' },
        { time: '10 pm', temp: '56&deg;', imgSrc: 'src/assets/cloud.png' },
        { time: '11 pm', temp: '55&deg;', imgSrc: 'src/assets/cloud.png' },
        { time: '12 am', temp: '55&deg;', imgSrc: 'src/assets/cloud.png' },
        { time: '1 am', temp: '56&deg;', imgSrc: 'src/assets/cloud.png' },
        { time: '2 am', temp: '56&deg;', imgSrc: 'src/assets/cloud.png' },
    ];

    const secondContainerData = [
        { time: 'Today', temp: '55&deg-75&deg;', imgSrc: 'src/assets/sun.png' },
        { time: 'Sat', temp: '48&deg-67&deg;', imgSrc: 'src/assets/cloud.png' },
        { time: 'Sun', temp: '41&deg-64&deg;', imgSrc: 'src/assets/sun.png' },
        { time: 'Mon', temp: '38&deg-61&deg;', imgSrc: 'src/assets/sun_and_cloud.png' },
        { time: 'Tue', temp: '45&deg-62&deg;', imgSrc: 'src/assets/sun.png' },
        { time: 'Wed', temp: '51&deg-63&deg;', imgSrc: 'src/assets/sun_and_cloud.png' },
        { time: 'Thu', temp: '44&deg-59&deg;', imgSrc: 'src/assets/sun_and_cloud.png' },
    ];

    return (
        <>
            <h1>Current Location</h1>
            <div style={circleStyle}>
                <span style={{ fontSize: '30px', marginTop: '20px' }}>Sunny</span>
                <span style={{ marginTop: '-50px' }}>70&deg;</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <ProgressBar value={70} min={55} max={75} />
            </div>
            <div>
                <span style={textStyle}>Low of 55&deg; High of 75&deg;</span>
            </div>

            <div style={{marginTop: '20px'}}>
                <div style={containerWrapperStyle}>
                    {isFirstContainerVisible ? (
                        firstContainerData.map((data, index) => (
                            <div key={index} style={roundedRectangleStyle}>
                                <span style={textStyle}>{data.time}</span>
                                <img src={data.imgSrc} style={imgStyle} />
                                <span style={textStyle} dangerouslySetInnerHTML={{ __html: data.temp }} />
                            </div>
                        ))
                    ) : (
                        secondContainerData.map((data, index) => (
                            <div key={index} style={roundedRectangleStyle}>
                                <span style={textStyle}>{data.time}</span>
                                <img src={data.imgSrc} style={imgStyle} />
                                <span style={tempStyle} dangerouslySetInnerHTML={{ __html: data.temp }} />
                            </div>
                        ))
                    )}
                </div>
            </div>

            <button onClick={toggleContainer} style={{ display: 'block', margin: '10px auto', padding: '10px', backgroundColor: 'transparent', border: '3px solid black', fontWeight: 'bold', fontSize: '30px'}}>
                {isFirstContainerVisible ? 'Show 7 day Forcast' : 'Show 12 hour Forcast'}
            </button>

            <div style={mapContainerStyle}>
                <MapContainer center={position} zoom={6} style={{ height: '500px', width: '700px' }}>
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    />
                    <Marker position={position}>
                        <Popup>
                            Your current location. <br /> Say Hi!
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>
        </>
    );
}
