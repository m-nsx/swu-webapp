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
        <div>
            <form onSubmit={handleDelete}>
                <label>
                    Card ID:
                    <input
                        type="text"
                        value={cardId}
                        onChange={(e) => setCardId(e.target.value)}
                    />
                </label>
                <button type="submit">Delete Card</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default CardDelete;