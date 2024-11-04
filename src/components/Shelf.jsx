// src/components/Shelf.jsx

import React from 'react';
import '../components/Shelf.css';

export function Shelf() {
    const products = [
        { id: 1, name: "Tops", description: "Displayed here will be the current tops you have in your closet." },
        { id: 2, name: "Bottoms", description: "Your current bottoms." },
        { id: 3, name: "Shoes", description: "Your current shoes." },
        { id: 3, name: "Accessories", description: "Your current accessories." },
    ];

    return (
        <div className="shelf">
            <h2>Your Clothes</h2>
            <div className="product-list">
                {products.map(product => (
                    <div className="product" key={product.id}>
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
