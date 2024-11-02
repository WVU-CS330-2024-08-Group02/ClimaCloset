import { useState } from "react"
import { Button } from "../components/Button"
import { StoreItem } from "../components/StoreItem"
import { WeatherPreferences } from "../components/WeatherPreferences"
import { Tops } from "../components/Tops"
import { Bottoms } from "../components/Bottoms"
import { Shoes } from "../components/Shoes"
import { Accessories } from "../components/Accessories"

export function Closet() {
    const [showItem, setShowItem] = useState(false)

    function HandleShow({show}){
      if (show) {
        return (
          <StoreItem item={item1}/>
        )
      }
    }
  
    const item1 = {title: "Jacket", desc: "Carhartt Jacket", price: 120}
    const item2 = {title: "Ball", desc: "Standard baseball", price: 5}
    const item3 = {title: "Bat", desc: "Baseball helmet", price: 25}
  
    return (
    <>
        <Button show={showItem} setShow={setShowItem}/>
        <HandleShow show={showItem}/>
        <WeatherPreferences />
        <Tops />
        <Bottoms />
        <Shoes />
        <Accessories />
    </>
    )
}