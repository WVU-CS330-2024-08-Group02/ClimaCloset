import React, { useState, useEffect } from 'react';
import { WeatherPreferences } from "../components/WeatherPreferences";
import { Tops } from "../components/Tops";
import { Bottoms } from "../components/Bottoms";
import { Shoes } from "../components/Shoes";
import { Accessories } from "../components/Accessories";
import { CenterContainer } from '../components/CenterContainer';
import './Closet.css';
import { TransparentBox } from '../components/TransparentBox';

export function Closet() {
    // State to hold multiple selected options for each category
    const [selectedTops, setSelectedTops] = useState([]);
    const [selectedBottoms, setSelectedBottoms] = useState([]);
    const [selectedShoes, setSelectedShoes] = useState([]);
    const [selectedAccessories, setSelectedAccessories] = useState([]);

    // Load saved outfit selections from localStorage (if available)
    useEffect(() => {
        const savedTops = JSON.parse(localStorage.getItem("selectedTops")) || [];
        const savedBottoms = JSON.parse(localStorage.getItem("selectedBottoms")) || [];
        const savedShoes = JSON.parse(localStorage.getItem("selectedShoes")) || [];
        const savedAccessories = JSON.parse(localStorage.getItem("selectedAccessories")) || [];

        setSelectedTops(savedTops);
        setSelectedBottoms(savedBottoms);
        setSelectedShoes(savedShoes);
        setSelectedAccessories(savedAccessories);
    }, []);

    // Save outfit selection arrays to localStorage whenever a selection changes
    useEffect(() => {
        localStorage.setItem("selectedTops", JSON.stringify(selectedTops));
        localStorage.setItem("selectedBottoms", JSON.stringify(selectedBottoms));
        localStorage.setItem("selectedShoes", JSON.stringify(selectedShoes));
        localStorage.setItem("selectedAccessories", JSON.stringify(selectedAccessories));
    }, [selectedTops, selectedBottoms, selectedShoes, selectedAccessories]);

    // Toggle selection of an item in a category
    const toggleSelection = (item, setSelectedItems, selectedItems) => {
        setSelectedItems((prevItems) =>
            prevItems.includes(item) 
                ? prevItems.filter((i) => i !== item) // Remove item if already selected
                : [...prevItems, item] // Add item if not selected
        );
    };

    return (
        <>
            <CenterContainer className="preferences-center-container">

                <TransparentBox className="ideal-temp"> 
                    <WeatherPreferences />
                </TransparentBox>
                
                <TransparentBox>
                    <Tops onSelect={(top) => toggleSelection(top, setSelectedTops, selectedTops)} selected={selectedTops} />
                </TransparentBox>
                
                <TransparentBox>
                    <Bottoms onSelect={(bottom) => toggleSelection(bottom, setSelectedBottoms, selectedBottoms)} selected={selectedBottoms} />
                </TransparentBox>
                    
                <TransparentBox>
                    <Shoes onSelect={(shoes) => toggleSelection(shoes, setSelectedShoes, selectedShoes)} selected={selectedShoes} />
                </TransparentBox>
                

                <TransparentBox>
                    <Accessories onSelect={(accessory) => toggleSelection(accessory, setSelectedAccessories, selectedAccessories)} selected={selectedAccessories} />
                </TransparentBox>
                
            </CenterContainer>
        </>
    );
}