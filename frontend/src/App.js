import React, { useState, useEffect } from 'react';
import CardList from './components/card/CardList';
import CardAdd from './components/card/CardAdd';
import { getAllCards, deleteCard } from './api';
import CardFetch from './components/card/CardFetch';

const App = () => {
    const [cards, setCards] = useState([]);

    const fetchCards = async () => {
        const response = await getAllCards();
        setCards(response.data.data);
    };

    useEffect(() => {
        fetchCards();
    }, []);

    const handleCardAdded = () => {
        fetchCards();
    };

    const handleCardDeleted = () => {
        fetchCards();
    };

    const handleDeleteAll = async () => {
        try {
            for (const card of cards) {
                await deleteCard(card._id);
            }
            fetchCards();
        } catch (error) {
            console.error('Error deleting all cards:', error);
        }
    };

    return (
        <div>
            <CardAdd onCardAdded={handleCardAdded} />
            <CardFetch />
            <CardList cards={cards} onCardDeleted={handleCardDeleted} onDeleteAll={handleDeleteAll} />
        </div>
    );
};

export default App;