import React from 'react';

const CardList = ({ cards }) => {
    return (
        <div>
            <h2>Card List</h2>
            <ul>
                {cards.map(card => (
                    <li key={card._id}>{card.name} ({card._id})</li>
                ))}
            </ul>
        </div>
    );
};

export default CardList;