import { useState } from "react"
import { Button } from "../components/Button"
import { StoreItem } from "../components/StoreItem"
import { WeatherPreferences } from "../components/WeatherPreferences"
import { Tops } from "../components/Tops"
import { Bottoms } from "../components/Bottoms"
import { Shoes } from "../components/Shoes"
import { Accessories } from "../components/Accessories"

export function Closet() {
  
    return (
    <>
        <div style={{backgroundColor: '#ab7c0d', height: '100vh', width: '100%', margin: 0}}>
            <WeatherPreferences />
            <Tops />
            <Bottoms />
            <Shoes />
            <Accessories />
        </div>
    </>
    )
}