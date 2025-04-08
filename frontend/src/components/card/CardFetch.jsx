import React, { useState } from 'react';
import { addCard, getAllCards, updateCard } from '../../api';

import './CardFetch.css';
import ConfirmModal from '../ConfirmModal';
import InfoModal from '../InfoModal';
import axios from 'axios';
import CardExtension from './CardExtension';

const CardFetch = ({ onCardsFetched }) => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showInfoModal, setShowInfoModal] = useState(false);
    const [extensions, setExtensions] = useState([]);

    const fetchAndAddCards = async () => {
        setLoading(true);
        setMessage('');

        try {
            if (extensions.length === 0) {
                console.error('No extensions selected.');
                setLoading(false);
                return;
            }

            // Fetch existing cards from the database
            const existingCardsResponse = await getAllCards();
            const existingCards = existingCardsResponse.data.data;

            // Fetch cards from the official API based on selected extensions
            const response = await axios.get(`/cards/${extensions.join(',')}`);
            const cards = response.data.data;

            if (!cards || cards.length === 0) {
                console.error('No cards found for the selected extensions.');
                setLoading(false);
                return;
            }

            // Process each card
            for (const card of cards) {
                const parsedCard = {
                    name: card.Name || 'Unknown',
                    type: card.Type || 'Unknown',
                    cost: parseInt(card.Cost, 10),
                    power: parseInt(card.Power, 10),
                    hp: parseInt(card.HP, 10),
                    aspect: card.Aspects ? card.Aspects.join(', ') : 'Unknown',
                    arena: card.Arenas ? card.Arenas.join(', ') : 'Unknown',
                    trait: card.Traits ? card.Traits.join(', ') : 'Unknown',
                    rarity: card.Rarity || 'Unknown',
                    set: card.Set || 'Unknown',
                    artist: card.Artist || 'Unknown',
                    cardno: parseInt(card.Number, 10) || -1,
                    image: card.FrontArt || 'https://placehold.co/468x652',
                };

                // Check if the card already exists
                const existingCard = existingCards.find((c) =>
                    c.name === parsedCard.name &&
                    c.cardno === parsedCard.cardno
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
            setShowInfoModal(true);
            setLoading(false);
        }
    };

    const handleConfirm = () => {
        setShowConfirmModal(false);
        fetchAndAddCards();
    };

    const handleRefresh = () => {
        window.location = window.location; // Refresh
        setShowInfoModal(false);
    };

    return (
        <div className="card-fetch-container">
            <h2 className="card-fetch-title">Update card index from SWUDB</h2>
            <h4 className="card-fetch-subtitle">Retrieve cards from SWUDB web API</h4>
            <CardExtension onExtensionsChange={setExtensions} />
            <button className="card-fetch-button" onClick={() => setShowConfirmModal(true)} disabled={loading}>
                {loading ? 'Loading...' : 'Update Index'}
            </button>
            {message && <p className="card-fetch-message">{message}</p>}
            <ConfirmModal
                show={showConfirmModal}
                onClose={() => setShowConfirmModal(false)}
                onConfirm={handleConfirm}
                message="This action may take a while and will overwrite actual data."
            />
            <InfoModal
                show={showInfoModal}
                onClose={handleRefresh}
                message="Card index has been updated."
            />
        </div>
    );
};

export default CardFetch;