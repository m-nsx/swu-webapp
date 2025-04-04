import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getAllCards, deleteCard, getAllDecks, deleteDeck } from './api';

import './App.css';
import React from 'react';
import CardList from './components/card/CardList';
import CardFetch from './components/card/CardFetch';
import CardAdd from './components/card/CardAdd';
import SearchEngine from './components/search/SearchEngine';
import CardCollection from './components/card/CardCollection';
import DeckList from './components/deck/DeckList';
import DeckAdd from './components/deck/DeckAdd';
import SusButton from './components/fun/SusButton';

const App = () => {

    const [cards, setCards] = useState([]);
    const [decks, setDecks] = useState([]);

    const fetchCards = async () => {
        const response = await getAllCards();
        setCards(response.data.data);
    };

    const fetchDecks = async () => {
        const response = await getAllDecks();
        setDecks(response.data.data);
    };

    useEffect(() => {
        fetchCards();
        fetchDecks();
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

    const handleCardUpdated = (updatedCard) => {
        setCards((prevCards) =>
            prevCards.map((card) =>
                card._id === updatedCard._id ? updatedCard : card
            )
        );
    };

    const handleDeckDeleted = () => {
        fetchDecks(); // Reload decks from the API
    };

    const handleDeleteAllDecks = async () => {
        try {
            for (const deck of decks) {
                await deleteDeck(deck._id);
            }
            fetchDecks(); // Reload decks from the API
        } catch (error) {
            console.error('Error deleting all decks:', error);
        }
    };

    const handleDeckAdded = () => {
        fetchDecks();
    };

    return (
        <Router>
            <div>
                {/* Bandeau de navigation */}
                <nav className="navbar">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/index-management">Database</Link></li>
                        <li><Link to="/index">Collection</Link></li>
                        <li><Link to="/decks">Decks</Link></li>
                        <li><Link to="/search">Search</Link></li>
                    </ul>
                </nav>

                {/* Contenu des pages */}
                <Routes>
                    <Route path="/" element={
                        <>
                            <h1 className='title'>SWU CM</h1>
                            <h2 className='subtitle'>Star Wars Unlimited Collection Manager</h2>
                            <SusButton />
                        </>
                    } />
                    <Route path="/index-management" element={
                        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', padding: '10px', gap: '20px' }}>
                            <div style={{ width: '45%' }}>
                                <CardAdd onCardAdded={handleCardAdded} />
                            </div>
                            <div style={{ width: '45%' }}>
                                <CardFetch />
                            </div>
                            <div style={{ width: '100%', marginTop: '20px' }}>
                                <CardList
                                    cards={cards}
                                    setCards={setCards}
                                    onCardDeleted={handleCardDeleted}
                                    onCardUpdated={handleCardUpdated}
                                    onDeleteAll={handleDeleteAll}
                                />
                            </div>
                        </div>                    
                    } />
                    <Route path="/index" element={
                        <CardCollection
                            cards={cards}
                            setCards={setCards}
                            onCardDeleted={handleCardDeleted}
                            onCardUpdated={handleCardUpdated}
                            onDeleteAll={handleDeleteAll}
                            decks={decks}
                        />
                    } />
                    <Route path="/decks" element={
                        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', padding: '10px', gap: '20px' }}>
                            <div style={{ width: '45%' }}>
                                <DeckAdd onDeckAdded={handleDeckAdded} />
                            </div>
                            <div style={{ width: '100%', marginTop: '20px' }}>
                                <DeckList
                                    decks={decks}
                                    setDecks={setDecks}
                                    onDeckDeleted={handleDeckDeleted}
                                    onDeleteAll={handleDeleteAllDecks}
                                />
                            </div>
                        </div>
                    } />
                    <Route path="/search" element={<SearchEngine />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;