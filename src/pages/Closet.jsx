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
        <WeatherPreferences />
        <Tops />
        <Bottoms />
        <Shoes />
        <Accessories />
    </>
    )
}