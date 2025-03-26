import React from 'react';

const CardList = ({ cards }) => {
    return (
        <div className="card-list">
            <h2 className="section-title">Card List</h2>
            <div className="card-grid">
                {cards.map(card => (
                    <div key={card._id} className="card-tile">
                        <h3 className="card-title">{card.name}</h3>
                        <p className="card-detail">Type: {card.type}</p>
                        <p className="card-detail">Cost: {card.cost}</p>
                        <p className="card-detail">Power: {card.power}</p>
                        <p className="card-detail">HP: {card.hp}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CardList;