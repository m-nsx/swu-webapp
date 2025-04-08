import React, { useState } from 'react';
import { addDeck } from '../../api';
import InfoModal from '../InfoModal';
import './DeckAdd.css';

const DeckAdd = ({ onDeckAdded }) => {
    const [deckName, setDeckName] = useState('');
    const [showModal, setShowModal] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!deckName) return;
        await addDeck({ name: deckName });
        onDeckAdded();
        setShowModal(true);
        setDeckName('');
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="add-deck-form">
                <h2 className="deck-add-title">Add a Deck</h2>
                <input
                    type="text"
                    value={deckName}
                    onChange={(e) => setDeckName(e.target.value)}
                    placeholder="Deck Name"
                    className="input-field"
                    required
                />
                <button type="submit" className="add-deck-button">Add Deck</button>
            </form>
            <InfoModal
                show={showModal}
                onClose={() => setShowModal(false)}
                message="Deck successfully added."
            />
        </>
    );
};

export default DeckAdd;
