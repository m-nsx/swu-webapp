import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getAllCards, deleteCard } from './api';

import './App.css';
import React from 'react';
import CardList from './components/card/CardList';
import CardFetch from './components/card/CardFetch';
import CardAdd from './components/card/CardAdd';
import DeckManager from './components/deck/DeckManager';
import SearchEngine from './components/search/SearchEngine';

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
        <Router>
            <div>
                {/* Bandeau de navigation */}
                <nav className="navbar">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/index-management">Card management</Link></li>
                        <li><Link to="/index">Card list</Link></li>
                        <li><Link to="/decks">Deck Management</Link></li>
                        <li><Link to="/search">Search Engine</Link></li>
                    </ul>
                </nav>

                {/* Contenu des pages */}
                <Routes>
                    <Route path="/" element={
                        <>
                            <h1>Home</h1>
                        </>
                    } />
                    <Route path="/index-management" element={
                        <div style={{ display: 'flex', justifyContent: 'center', padding: '10px', gap: '10px' }}>
                            <div style={{ width: '45%' }}>
                                <CardAdd onCardAdded={handleCardAdded} />
                            </div>
                            <div style={{ width: '45%' }}>
                                <CardFetch />
                            </div>
                        </div>
                    } />
                    <Route path="/index" element={
                        <>
                            <CardList cards={cards} onCardDeleted={handleCardDeleted} onDeleteAll={handleDeleteAll} />
                        </>
                    } />
                    <Route path="/decks" element={<DeckManager />} />
                    <Route path="/search" element={<SearchEngine />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;