import React, { useState } from 'react';
import { deleteCard } from '../api';

const CardDelete = ({ onCardDeleted }) => {
    // State to hold the card ID input value
    const [cardId, setCardId] = useState('');
    // State to hold the message to display after attempting to delete the card
    const [message, setMessage] = useState('');

    // Function to handle the card deletion process
    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            // Attempt to delete the card using the provided card ID
            await deleteCard(cardId);
            setMessage('Card deleted successfully');
            onCardDeleted();
        } catch (error) {
            setMessage('Error deleting card');
        }
    };

    return (
        <div className="card-delete">
            <form onSubmit={handleDelete} className="delete-form">
                <label>
                    Card ID:
                    <input
                        type="text"
                        value={cardId}
                        onChange={(e) => setCardId(e.target.value)}
                        className="input-field"
                    />
                </label>
                <button type="submit" className="delete-button">Delete Card</button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default CardDelete;