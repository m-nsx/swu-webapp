import React, { useState } from 'react';
import { deleteDeck, updateDeck } from '../../api';
import { HiDocumentSearch } from "react-icons/hi";
import { HiTrash } from "react-icons/hi";

import ConfirmModal from '../ConfirmModal';
import InfoModal from '../InfoModal';
import './DeckList.css';

const DeckList = ({ decks, setDecks, onDeckDeleted, onDeleteAll, onDeckUpdated }) => {
    const [showModal, setShowModal] = useState(false);
    const [confirmDeleteDeck, setConfirmDeleteDeck] = useState({ show: false, deckId: null });
    const [searchQuery, setSearchQuery] = useState('');
    const [infoModal, setInfoModal] = useState({ show: false, message: '' });

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredDecks = decks.filter(deck =>
        deck.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDelete = async (id) => {
        const deck = decks.find(deck => deck._id === id);
        if (deck.cards && deck.cards.trim() !== '') {
            setConfirmDeleteDeck({ show: true, deckId: id });
        } else {
            try {
                await deleteDeck(id);
                setDecks(decks.filter(deck => deck._id !== id));
                onDeckDeleted();
            } catch (error) {
                console.error('Error deleting deck:', error);
            }
        }
    };

    const confirmDeleteDeckAction = async () => {
        try {
            await deleteDeck(confirmDeleteDeck.deckId);
            setDecks(decks.filter(deck => deck._id !== confirmDeleteDeck.deckId)); // Update state to remove the deleted deck
            onDeckDeleted();
        } catch (error) {
            console.error('Error deleting deck:', error);
        } finally {
            setConfirmDeleteDeck({ show: false, deckId: null });
        }
    };

    const handleDeleteAll = async () => {
        setShowModal(true);
    };

    const confirmDeleteAll = async () => {
        setShowModal(false);
        try {
            await Promise.all(decks.map(deck => deleteDeck(deck._id)));
            onDeckDeleted();
            onDeleteAll();
        } catch (error) {
            console.error('Error deleting all decks:', error);
        }
    };

    const handleShowId = (id) => {
        setInfoModal({ show: true, message: `Deck ID: ${id}` });
    };

    return (
        <div className="deck-list">
            <h2 className="section-title">Deck Manager</h2>
            <h3 className="section-subtitle">You have created {decks.length} decks</h3>
            <div className="search-controls">
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </div>
            <div className="deck-grid">
                {filteredDecks.map(deck => (
                    <div key={deck._id} className="deck-tile">
                        <h3 className="deck-title">{deck.name}</h3>
                        <div className="deck-attributes">
                            <p className="deck-detail"><strong>Cards:</strong> {deck.cards || 'No cards'}</p>
                        </div>
                        <div className="button-group">
                            <button className="delete-deck-button" onClick={() => handleDelete(deck._id)}>
                                <HiTrash />
                            </button>
                            <button className="show-deck-id-button" onClick={() => handleShowId(deck._id)}>
                                <HiDocumentSearch />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {decks.length > 0 && (
                <button className="delete-all-button" onClick={handleDeleteAll}>Delete All Decks</button>
            )}
            <ConfirmModal
                show={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={confirmDeleteAll}
                message="This action cannot be undone. Are you sure you want to delete all decks ?"
            />
            <ConfirmModal
                show={confirmDeleteDeck.show}
                onClose={() => setConfirmDeleteDeck({ show: false, deckId: null })}
                onConfirm={confirmDeleteDeckAction}
                message="This deck is not empty. Are you sure you want to delete it ?"
            />
            <InfoModal
                show={infoModal.show}
                onClose={() => setInfoModal({ show: false, message: '' })}
                message={infoModal.message}
            />
        </div>
    );
};

export default DeckList;
