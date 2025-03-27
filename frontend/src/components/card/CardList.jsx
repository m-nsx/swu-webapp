import React, { useState } from 'react';
import { deleteCard } from '../../api';
import { FaTrash } from 'react-icons/fa';

import ConfirmModal from '../ConfirmModal';
import './CardList.css';

const CardList = ({ cards, onCardDeleted, onDeleteAll }) => {
    const [showModal, setShowModal] = useState(false);

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

    return (
        <div className="card-list">
            <h2 className="section-title">Card Collection</h2>
            <h3 className="section-subtitle">You have indexed {cards.length} cards</h3>
            <div className="card-grid">
                {cards.map(card => (
                    <div key={card._id} className="card-tile">
                        <img src={card.image} className="card-image" alt={card.name} />
                        <h3 className="card-title">{card.name}</h3>
                        <div className="card-attributes">
                            <p className="card-detail"><strong>Type:</strong> {card.type}</p>
                            <p className="card-detail"><strong>Cost:</strong> {card.cost}</p>
                            <p className="card-detail"><strong>Power:</strong> {card.power}</p>
                            <p className="card-detail"><strong>HP:</strong> {card.hp}</p>
                            <p className="card-detail"><strong>ID:</strong> {card._id}</p>
                            <p className="card-detail"><strong>Aspect:</strong> {card.aspect}</p>
                            <p className="card-detail"><strong>Arena:</strong> {card.arena}</p>
                            <p className="card-detail"><strong>Trait:</strong> {card.trait}</p>
                            <p className="card-detail"><strong>Rarity:</strong> {card.rarity}</p>
                            <p className="card-detail"><strong>Set:</strong> {card.set}</p>
                            <p className="card-detail"><strong>Artist:</strong> {card.artist}</p>
                            <p className="card-detail"><strong>Card No:</strong> {card.cardno}</p>
                        </div>
                        <button className="delete-button" onClick={() => handleDelete(card._id)}>
                            <FaTrash />
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
        </div>
    );
};

export default CardList;