import React, { useState } from 'react';
import { addCard, getAllCards, updateCard } from '../../api';

import './CardFetch.css';
import ConfirmModal from '../ConfirmModal';
import axios from 'axios';

const CardFetch = ({ onCardsFetched }) => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [showModal, setShowModal] = useState(false);

    const fetchAndAddCards = async () => {
        setLoading(true);
        setMessage('');

        try {
            // Fetch existing cards from the database
            const existingCardsResponse = await getAllCards();
            const existingCards = existingCardsResponse.data.data;

            // Fetch cards from the official API
            const response = await axios.get('/cards/sor');
            const cards = response.data.data;

            if (!cards || cards.length === 0) {
                console.error('No cards found in the SOR collection.');
                setLoading(false);
                return;
            }

            // Process each card
            for (const card of cards) {
                const parsedCard = {
                    name: card.Name || 'Unknown',
                    type: card.Type || 'Unknown',
                    cost: parseInt(card.Cost, 10) || -1,
                    power: parseInt(card.Power, 10) || -1,
                    hp: parseInt(card.HP, 10) || -1,
                    uppower: -1,
                    uphp: -1,
                    aspect: card.Aspects ? card.Aspects.join(', ') : 'Unknown',
                    arena: card.Arenas ? card.Arenas.join(', ') : 'Unknown',
                    trait: card.Traits ? card.Traits.join(', ') : 'Unknown',
                    rarity: card.Rarity || 'Unknown',
                    set: card.Set || 'Unknown',
                    artist: card.Artist || 'Unknown',
                    cardno: parseInt(card.Number, 10) || -1,
                    image: card.FrontArt || 'https://placehold.co/468x652',
                };

                const existingCard = existingCards.find((c) => 
                    c.name === parsedCard.name &&
                    c.type === parsedCard.type &&
                    c.cost === parsedCard.cost &&
                    c.power === parsedCard.power &&
                    c.hp === parsedCard.hp &&
                    c.uppower === parsedCard.uppower &&
                    c.uphp === parsedCard.uphp &&
                    c.aspect === parsedCard.aspect &&
                    c.arena === parsedCard.arena &&
                    c.trait === parsedCard.trait &&
                    c.rarity === parsedCard.rarity &&
                    c.set === parsedCard.set &&
                    c.artist === parsedCard.artist &&
                    c.cardno === parsedCard.cardno &&
                    c.image === parsedCard.image
                );

                if (existingCard) {
                    // Update the card if it has changed
                    const hasChanged = Object.keys(parsedCard).some(
                        (key) => parsedCard[key] !== existingCard[key]
                    );
                    if (hasChanged) {
                        try {
                            await updateCard(existingCard._id, parsedCard);
                        } catch (error) {
                            console.error(`Error updating card "${parsedCard.name}":`, error);
                        }
                    }
                } else {
                    // Add the card if it doesn't exist
                    try {
                        await addCard(parsedCard);
                    } catch (error) {
                        console.error(`Error adding card "${parsedCard.name}":`, error);
                    }
                }
            }

            onCardsFetched();

        } catch (error) {
            console.error('Error fetching cards from the API:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleConfirm = () => {
        setShowModal(false);
        fetchAndAddCards();
    };

    return (
        <div className="card-fetch-container">
            <h2 className="card-fetch-title">Update card index from SWUDB</h2>
            <h4 className="card-fetch-body">Call SWUDB API to retrieve, compare and update local database</h4>
            <button className="card-fetch-button" onClick={() => setShowModal(true)} disabled={loading}>
                {loading ? 'Loading...' : 'Update Index'}
            </button>
            {message && <p className="card-fetch-message">{message}</p>}
            <ConfirmModal
                show={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={handleConfirm}
                message="This action may take a while and you will need to refresh this page."
            />
        </div>
    );
};

export default CardFetch;