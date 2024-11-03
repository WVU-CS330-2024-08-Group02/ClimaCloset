import { WeatherPreferences } from "../components/WeatherPreferences"
import { Tops } from "../components/Tops"
import { Bottoms } from "../components/Bottoms"
import { Shoes } from "../components/Shoes"
import { Accessories } from "../components/Accessories"
import './Closet.css';


export function Closet() {
  
    return (
    <>
        <div className="closet-area">
            <WeatherPreferences />
            <Tops />
            <Bottoms />
            <Shoes />
            <Accessories />
        </div>
    </>
    )
}