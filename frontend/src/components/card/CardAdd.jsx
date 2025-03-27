import React, { useState } from 'react';
import { addCard } from '../../api';

import './CardAdd.css';
import InfoModal from '../InfoModal';

const CardAdd = ({ onCardAdded }) => {
    const [card, setCard] = useState({ name: '', type: ''});
    const [showModal, setShowModal] = useState(false);

    const handleChange = (e) => {
        setCard({ ...card, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!card.image) {
            card.image = 'https://placehold.co/468x652';
        }
        await addCard(card);
        onCardAdded();
        setShowModal(true);
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="add-form">
                <h2 className='card-add-title'>Add a Card</h2>
                <input name="name" onChange={handleChange} placeholder="Name" required className="input-field" />
                <input name="type" onChange={handleChange} placeholder="Type" className="input-field" />
                <input name="cost" type="number" onChange={handleChange} placeholder="Cost" className="input-field" />
                <input name="power" type="number" onChange={handleChange} placeholder="Power" className="input-field" />
                <input name="hp" type="number" onChange={handleChange} placeholder="HP" className="input-field" />
                <input name="aspect" onChange={handleChange} placeholder="Aspect" className="input-field" />
                <input name="arena" onChange={handleChange} placeholder="Arena" className="input-field" />
                <input name="trait" onChange={handleChange} placeholder="Trait" className="input-field" />
                <input name="rarity" onChange={handleChange} placeholder="Rarity" className="input-field" />
                <input name="set" onChange={handleChange} placeholder="Set" className="input-field" />
                <input name="artist" onChange={handleChange} placeholder="Artist" className="input-field" />
                <input name="cardno" type="number" onChange={handleChange} placeholder="Card Number" className="input-field" />
                <input name="image" onChange={handleChange} placeholder="Image URL" className="input-field" />
                <button type="submit" className="add-button">Add Card</button>
            </form>
            <InfoModal
                show={showModal}
                onClose={() => setShowModal(false)} // Close the modal
                message="Card successfully added."
            />
        </>
    );
};

export default CardAdd;