import React from 'react';
import '../ConfirmModal.css';

const DetailModal = ({ show, onClose, card }) => {
    if (!show || !card) return null; // Ne rien afficher si `show` est faux ou si `card` est null

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>{card.name}</h2>
                <p><strong>Type:</strong> {card.type}</p>
                <p><strong>Cost:</strong> {card.cost}</p>
                <p><strong>Power:</strong> {card.power}</p>
                <p><strong>HP:</strong> {card.hp}</p>
                <p><strong>Aspect:</strong> {card.aspect}</p>
                <p><strong>Arena:</strong> {card.arena}</p>
                <p><strong>Trait:</strong> {card.trait}</p>
                <p><strong>Rarity:</strong> {card.rarity}</p>
                <p><strong>Set:</strong> {card.set}</p>
                <p><strong>Artist:</strong> {card.artist}</p>
                <p><strong>Card No:</strong> {card.cardno}</p>
                <button className="modal-button-info" onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default DetailModal;