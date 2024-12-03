import sunnyIcon from "../../assets/weatherIcons/Sun.png";
import sunnyCloudyIcon from "../../assets/weatherIcons/Sun_and_Cloud.png"
import stormyIcon from "../../assets/weatherIcons/Rainy.png"

export function WeatherIcons({ type }) {
    const icons = {
        sunny: sunnyIcon,
        sunnyCloudy: sunnyCloudyIcon,
        stormy: stormyIcon,
        
    }

    return (
        <img src={icons[type]} alt={`${type} weather`} />
    )
}