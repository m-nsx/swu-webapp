import React, { useState } from 'react';
import { addCard } from '../api';

const CardAdd = ({ onCardAdded }) => {
    const [card, setCard] = useState({ name: '', type: '', cost: 0, power: 0, hp: 0 });

    const handleChange = (e) => {
        setCard({ ...card, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addCard(card);
        onCardAdded();
    };

    return (
        <form onSubmit={handleSubmit} className="add-form">
            <input name="name" onChange={handleChange} placeholder="Name" required className="input-field" />
            <input name="type" onChange={handleChange} placeholder="Type" className="input-field" />
            <input name="cost" type="number" onChange={handleChange} placeholder="Cost" className="input-field" />
            <input name="power" type="number" onChange={handleChange} placeholder="Power" className="input-field" />
            <input name="hp" type="number" onChange={handleChange} placeholder="HP" className="input-field" />
            <button type="submit" className="add-button">Add Card</button>
        </form>
    );
};

export default CardAdd;