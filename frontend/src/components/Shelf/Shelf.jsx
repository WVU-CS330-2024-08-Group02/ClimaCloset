// src/components/Shelf.jsx

import React from 'react';
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
// src/components/Shelf.jsx

export const products = [
    { id: 1, name: "Tops", images: [shortSleeve, coat] },
    { id: 2, name: "Bottoms", images: [jeans, shorts] },
    { id: 3, name: "Shoes", images: [sneakers, sandals, boots, flipFlops] },
    { id: 4, name: "Accessories", images: [umbrella] }
];

export function Shelf() {
    return (
        <div className='shelf'>
            <div className="product-list">
                <h2>Your Closet</h2>
                {products.map(product => (
                    <div className="product" key={product.id}>
                        <h3>{product.name}</h3>
                        <div className="product-images">
                            {product.images.map((image, index) => (
                                <img key={index} src={image} alt={`${product.name} ${index}`} className="product-image" />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

