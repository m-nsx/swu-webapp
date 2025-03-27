import React, { useState } from 'react';
import { deleteCard, updateCard } from '../../api'; // Import de updateCard
import { HiDocumentSearch } from "react-icons/hi";
import { HiTrash } from "react-icons/hi";
import { HiViewList } from "react-icons/hi";
import { HiBookmark } from "react-icons/hi";

import mongoose from 'mongoose';

import ConfirmModal from '../ConfirmModal';
import InfoModal from '../InfoModal';
import DetailModal from './CardDetail';
import './CardList.css';

const CardList = ({ cards, setCards, onCardDeleted, onDeleteAll, onCardUpdated }) => {
    const [showModal, setShowModal] = useState(false);
    const [sortCriteria, setSortCriteria] = useState('alphabetical');
    const [searchQuery, setSearchQuery] = useState('');
    const [favorites, setFavorites] = useState(new Set()); // Gestion des favoris
    const [infoModal, setInfoModal] = useState({ show: false, message: '' });
    const [detailModal, setDetailModal] = useState({ show: false, card: null });

    const handleSortChange = (e) => {
        setSortCriteria(e.target.value);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const toggleFavorite = (id) => {
        setFavorites((prevFavorites) => {
            const newFavorites = new Set(prevFavorites);
            if (newFavorites.has(id)) {
                newFavorites.delete(id);
            } else {
                newFavorites.add(id);
            }
            return newFavorites;
        });
    };

    const handleFavorite = async (id) => {
        try {
            const card = cards.find(c => c._id === id);
            await updateCard(id, { favorite: !card.favorite });
            card.favorite = !card.favorite;
            setFavorites((prevFavorites) => {
                const newFavorites = new Set(prevFavorites);
                if (newFavorites.has(id)) {
                    newFavorites.delete(id);
                } else {
                    newFavorites.add(id);
                }
                return newFavorites;
            });
        } catch (error) {
            console.error('Error updating favorite status:', error);
        }
    };

    const handleCollectionToggle = async (id) => {
        try {
            const card = cards.find(c => c._id === id);
            const updatedCollectionStatus = !card.collection;
            await updateCard(id, { collection: updatedCollectionStatus }); // Update on the server

            const updatedCard = { ...card, collection: updatedCollectionStatus };
            onCardUpdated(updatedCard); // Update the card in the global state
        } catch (error) {
            console.error('Error updating collection status:', error);
        }
    };

    const sortedCards = [...cards].sort((a, b) => {
        if (sortCriteria === 'alphabetical') {
            return a.name.localeCompare(b.name);
        } else if (sortCriteria === 'cardno') {
            return a.cardno - b.cardno || a.set.localeCompare(b.set);
        } else if (sortCriteria === 'cost') {
            return a.cost - b.cost;
        } else if (sortCriteria === 'power') {
            return a.power - b.power;
        } else if (sortCriteria === 'hp') {
            return a.hp - b.hp;
        } else if (sortCriteria === 'rarity') {
            const rarityOrder = ['Common', 'Uncommon', 'Rare', 'Legendary', 'Special'];
            return rarityOrder.indexOf(a.rarity) - rarityOrder.indexOf(b.rarity);
        } else if (sortCriteria === 'favorites') {
            return favorites.has(a._id) ? -1 : 1;
        }
        return 0;
    });

    const filteredCards = sortedCards.filter(card =>
        card.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (sortCriteria !== 'favorites' || card.favorite)
    );

    const handleDelete = async (id) => {
        try {
            await deleteCard(id);
            onCardDeleted();
        } catch (error) {
            console.error('Error deleting card:', error);
        }
    };

    const handleDeleteAll = async () => {
        setShowModal(true);
    };

    const confirmDeleteAll = async () => {
        setShowModal(false);
        try {
            await Promise.all(cards.map(card => deleteCard(card._id)));
            onCardDeleted();
            onDeleteAll();
        } catch (error) {
            console.error('Error deleting all cards:', error);
        }
    };

    const handleShowId = (id) => {
        setInfoModal({ show: true, message: `Card ID: ${id}` });
    };

    const handleShowDetail = (id) => {
        const card = cards.find(c => c._id === id);
        setDetailModal({ show: true, card });
    };

    const getRarityColor = (rarity) => {
        switch (rarity) {
            case 'Common':
                return '#aaaaaa';
            case 'Uncommon':
                return '#b3e5fc';
            case 'Rare':
                return '#ffcc80';
            case 'Legendary':
                return '#ffab91';
            case 'Special':
                return '#d1c4e9';
            default:
                return '#ffffff';
        }
    };

    return (
        <div className="card-list">
            <h2 className="section-title">Card Database</h2>
            <h3 className="section-subtitle">You have indexed {cards.length} cards</h3>
            <div className="controls">
                <div className="sort-controls">
                    <label htmlFor="sort">Sort by:</label>
                    <select id="sort" value={sortCriteria} onChange={handleSortChange}>
                        <option value="alphabetical">Alphabetical</option>
                        <option value="cardno">Card Number and Set</option>
                        <option value="cost">Cost</option>
                        <option value="power">Power</option>
                        <option value="hp">HP</option>
                        <option value="rarity">Rarity</option>
                        <option value="favorites">Favorites only (filter)</option>
                    </select>
                </div>
                <div className="search-controls">
                    <input
                        type="text"
                        placeholder="Search by name..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>
            </div>
            <div className="card-grid">
                {filteredCards.map(card => (
                    <div
                        key={card._id}
                        className="card-tile"
                        style={{
                            backgroundColor: sortCriteria === 'rarity' ? getRarityColor(card.rarity) : '#ffffff'
                        }}
                    >
                    <img src={card.image} className="card-image" alt={card.name} />
                    <h3 className="card-title">{card.name}</h3>
                    <div className="card-attributes">
                        <p className="card-detail"><strong>Type:</strong> {card.type}</p>
                        <p className="card-detail"><strong>Cost:</strong> {card.cost}</p>
                        <p className="card-detail"><strong>Power:</strong> {card.power}</p>
                        <p className="card-detail"><strong>HP:</strong> {card.hp}</p>
                        <p className="card-detail"><strong>Aspect:</strong> {card.aspect}</p>
                        <p className="card-detail"><strong>Arena:</strong> {card.arena}</p>
                        <p className="card-detail"><strong>Trait:</strong> {card.trait}</p>
                        <p className="card-detail"><strong>Card No:</strong> {card.cardno}</p>
                    </div>
                    <div className="button-group">
                        <button className="delete-button" onClick={() => handleDelete(card._id)}>
                            <HiTrash />
                        </button>
                        <button
                            className={`favorite-button ${card.favorite ? 'favorite' : ''}`}
                            onClick={() => handleFavorite(card._id)}
                        >
                            <HiBookmark />
                        </button>
                        <button className="show-detail-button" onClick={() => handleShowDetail(card._id)}>
                            <HiViewList />
                        </button>
                        <button className="show-id-button" onClick={() => handleShowId(card._id)}>
                            <HiDocumentSearch />
                        </button>
                    </div>
                    <button
                        className={`collection-button ${card.collection ? 'in-collection' : ''}`}
                        onClick={() => handleCollectionToggle(card._id)}
                    >
                        {card.collection ? 'In Collection' : 'Add to Collection'}
                    </button>
                    </div>
                ))}
            </div>
            {cards.length > 0 && (
                <button className="delete-all-button" onClick={handleDeleteAll}>Delete All Cards</button>
            )}
            <ConfirmModal
                show={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={confirmDeleteAll}
                message="This action cannot be undone. Are you sure you want to delete all cards ?"
            />
            <InfoModal
                show={infoModal.show}
                onClose={() => setInfoModal({ show: false, message: '' })}
                message={infoModal.message}
            />
            <DetailModal
                show={detailModal.show}
                onClose={() => setDetailModal({ show: false, card: null })}
                card={detailModal.card}
            />
        </div>
    );
};

export default CardList;