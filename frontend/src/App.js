import React, { useState, useEffect } from 'react';
import CardList from './components/CardList';
import CardAdd from './components/CardAdd';
import CardDelete from './components/CardDelete';
import { getAllCards } from './api';

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

    return (
        <div>
            <h1>Card Management</h1>
            <h2>Add Card</h2>
            <CardAdd onCardAdded={handleCardAdded} />
            <h2>Delete Card</h2>
            <CardDelete onCardDeleted={handleCardDeleted} />
            <CardList cards={cards} />
        </div>
    );
};

export default App;