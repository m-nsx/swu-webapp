import React, { useState } from 'react';
import './CardExtension.css';

const CardExtension = ({ onExtensionsChange }) => {
    const [selectedExtension, setSelectedExtension] = useState('');

    const handleChange = (event) => {
        const value = event.target.value;
        setSelectedExtension(value);
        onExtensionsChange([value]);
    };

    return (
        <div className="card-extension-container">
            <p className="card-extension-subtitle">Choose a set to fetch data</p>
            <select
                className="card-extension-dropdown"
                value={selectedExtension}
                onChange={handleChange}
            >
                <option value="" disabled>Select a set</option>
                <option value="sor">Spark of Rebellion</option>
                <option value="shd">Shadows of the Galaxy</option>
                <option value="twi">Twilight of the Republic</option>
                <option value="jtl">Jump to Lightspeed</option>
            </select>
        </div>
    );
};

export default CardExtension;
