// src/components/Shelf.jsx

import React from 'react';
import { useState, useEffect } from "react";
import axios from 'axios';
import './Shelf.css';
import umbrella from '../../assets/clothingIcons/umbrella.png';
import shortSleeve from '../../assets/clothingIcons/shortSleeve.png';
import coat from '../../assets/clothingIcons/Coat.png';
import jeans from '../../assets/clothingIcons/jeans.png';
import shorts from '../../assets/clothingIcons/shorts.png';
import sneakers from '../../assets/clothingIcons/sneakers.png';
import sandals from '../../assets/clothingIcons/sandals.png';
import boots from '../../assets/clothingIcons/boots.png';
import flipFlops from '../../assets/clothingIcons/flipFlops.png';

/* this makes the ids for each of the thing in the closet */
export function Shelf() {
    const [clothingData, setClothingData] = useState({
        tops: [], 
        bottoms: [],
        shoes: [],
        accessories: []
    });

    useEffect(() => {
        const userId = 1;

        axios.post('http://localhost:5000/api/PullCloset', { Id: userId })
            .then(response => {
                setClothingData({ 
                    tops: response.data.tops || [],
                    bottoms: response.data.bottoms || [],
                    shoes: response.data.shoes || [],
                    accessories: response.data.accessories || [],
                });
            })
            .catch(error => {
                console.error('Error fetching clothing data:', error);
            });
    }, []);

    const products = [
        {
            id: 1,
            name: "Tops",
            items: [
                { name: "Short_Sleeve", selected: !!clothingData.tops[0], image: shortSleeve },
                { name: "Long_Sleeve", selected: !!clothingData.tops[1], image: shortSleeve },
                { name: "Flannel", selected: !!clothingData.tops[2], image: shortSleeve },
                { name: "Tank_Top", selected: !!clothingData.tops[3], image: shortSleeve },
                { name: "Sweater", selected: !!clothingData.tops[4], image: shortSleeve },
                { name: "Sweatshirt", selected: !!clothingData.tops[5], image: shortSleeve },
                { name: "Jacket", selected: !!clothingData.tops[6], image: shortSleeve },
                { name: "Coat", selected: !!clothingData.tops[7], image: coat },
            ]
        },
        {
            id: 2,
            name: "Bottoms",
            items: [
                { name: "Jeans", selected: !!clothingData.bottoms[0], image: jeans },
                { name: "Sweatpants", selected: !!clothingData.bottoms[1], image: shortSleeve },
                { name: "Dress_Pants", selected: !!clothingData.bottoms[2], image: shortSleeve },
                { name: "Shorts", selected: !!clothingData.bottoms[3], image: shorts },
            ]
        },
        {
            id: 3,
            name: "Shoes",
            items: [
                { name: "Tennis_Shoes", selected: !!clothingData.shoes[0], image: sneakers },
                { name: "Boots", selected: !!clothingData.shoes[1], image: boots },
                { name: "Flip_Flops", selected: !!clothingData.shoes[2], image: flipFlops },
                { name: "Sandals", selected: !!clothingData.shoes[3], image: sandals },
            ]
        },
        {
            id: 4,
            name: "Accessories",
            items: [
                { name: "Sunglasses", selected: !!clothingData.accessories[0], image: shortSleeve },
                { name: "Hat", selected: !!clothingData.accessories[1], image: shortSleeve },
                { name: "Gloves", selected: !!clothingData.accessories[2], image: shortSleeve },
                { name: "Scarf", selected: !!clothingData.accessories[3], image: shortSleeve },
                { name: "Backpack", selected: !!clothingData.accessories[4], image: shortSleeve },
                { name: "Purse", selected: !!clothingData.accessories[5], image: shortSleeve },
                { name: "Umbrella", selected: !!clothingData.accessories[6], image: umbrella },
            ]
        }
    ];

    /* This goes through the map of items and places them in the shelf*/
    return (
        <div className='shelf'>
            <div className="product-list">
            <h2>Your Closet</h2>
                {products.map(product => (
                    <div className="product" key={product.id}>
                        <h3>{product.name}</h3>
                        <div className="product-images">
                            {product.items.map((item, index) => (
                                item.selected ? (
                                    <img key={index} src={item.image} alt={`${item.name}`} className="product-image" />
                                ) : null    
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
