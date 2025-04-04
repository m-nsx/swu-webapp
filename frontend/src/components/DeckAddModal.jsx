import React, { useState } from 'react';
import './DeckAddModal.css';

const DeckAddModal = ({ show, onClose, decks, onAddToDeck }) => {
    const [selectedDeck, setSelectedDeck] = useState('');

    if (!show) {
        return null;
    }

    const handleAdd = () => {
        if (selectedDeck) {
            onAddToDeck(selectedDeck);
            onClose();
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-deckadd-content">
                <h2>Add to Deck</h2>
                <select
                    className="deck-select"
                    value={selectedDeck}
                    onChange={(e) => setSelectedDeck(e.target.value)}
                >
                    <option value="" disabled>Select a deck</option>
                    {decks.map((deck) => (
                        <option key={deck._id} value={deck._id}>
                            {deck.name}
                        </option>
                    ))}
                </select>
                <div className="modal-deckadd-actions">
                    <button className="modal-button-info" onClick={handleAdd}>ADD</button>
                    <button className="modal-button-danger" onClick={onClose}>CANCEL</button>
                </div>
            </div>
        </div>
    );
};

export default DeckAddModal;
