import React, { useState, useEffect } from 'react';
import './App.css';
import CardList from './components/CardList';
import CardAdd from './components/CardAdd';
import CardDelete from './components/CardDelete';
import { getAllCards } from './api';

const App = () => {
    const [cards, setCards] = useState([]);
    const [activeForm, setActiveForm] = useState(null); // Track active form ('add' or 'delete')
    const [darkMode, setDarkMode] = useState(false); // Track dark mode

    const fetchCards = async () => {
        const response = await getAllCards();
        setCards(response.data.data);
    };

    useEffect(() => {
        fetchCards();
    }, []);

    const handleCardAdded = () => {
        fetchCards();
        setActiveForm(null); // Close form after adding
    };

    const handleCardDeleted = () => {
        fetchCards();
        setActiveForm(null); // Close form after deleting
    };

    return (
        <div className={`app-container ${darkMode ? 'dark-mode' : ''}`}>
            <header className="app-header">
                <h1 className="app-title">Card Management System</h1>
                <button
                    className="dark-mode-toggle"
                    onClick={() => setDarkMode(!darkMode)}
                >
                    {darkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
            </header>
            <main className="app-main">
                <section className="card-section">
                    <div className="tab-container">
                        <button
                            className="action-button"
                            onClick={() => setActiveForm('add')}
                        >
                            Add Card
                        </button>
                        <button
                            className="action-button"
                            onClick={() => setActiveForm('delete')}
                        >
                            Delete Card
                        </button>
                    </div>
                    {activeForm === 'add' && (
                        <div className="form-container">
                            <h2>Add a New Card</h2>
                            <CardAdd onCardAdded={handleCardAdded} />
                        </div>
                    )}
                    {activeForm === 'delete' && (
                        <div className="form-container">
                            <h2>Delete a Card</h2>
                            <CardDelete onCardDeleted={handleCardDeleted} />
                        </div>
                    )}
                </section>
                <section className="card-section">
                    <CardList cards={cards} />
                </section>
            </main>
            <footer className="app-footer">
                <p>&copy; Projet 3TC.</p>
            </footer>
        </div>
    );
};

export default App;