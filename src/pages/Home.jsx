import { useState } from 'react'

export function Home()  {
    const [chosenOption, setChosenOption] = useState([]);
    const plans = ["Business Plans", "Active Plans", "Lazy", "Casual", "Ceremony", "Sporting Event"];
    
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
        <>
            <h1>Your Current Closet</h1>
            <img alt="Logo" src="src/assets/ClosetIcon.ico" style={{ width: "300", height: "500px"}}></img>
            <form className="plans" onSubmit={handleChoice}>
            <h3>What are your plans for today?</h3>
            {plans.map((option, index) => (
                <div key={index}>
                    <input 
                        type="checkbox"
                        id={`checkbox-${index}`}
                        value={option}
                        checked={chosenOption.includes(option)}
                        onChange={() => handleCheckboxes(option)}
                    />
                    <label htmlFor={`checkbox-${index}`}>{option}</label>
                </div>
            ))}
            <div>
            <   button style={{backgroundColor: '#e8a812'}} type="submit">Finalize Plans</button>
            </div>
            <div>
                <button style={{backgroundColor: 'pink', padding: '20px'}} type="submit">Generate Outfit</button>
            </div>
            
        </form>
        </>
    )
}