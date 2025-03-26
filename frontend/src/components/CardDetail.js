import React, { useEffect, useState } from 'react';
import { getCardById } from '../api';

const CardDetail = ({ id }) => {
    const [card, setCard] = useState(null);

    useEffect(() => {
        const fetchCard = async () => {
            const response = await getCardById(id);
            setCard(response.data.data);
        };
        fetchCard();
    }, [id]);

    if (!card) return <div>Loading...</div>;

    return (
        <div>
            <h2>{card.name}</h2>
            <p>Type: {card.type}</p>
            <p>Cost: {card.cost}</p>
            <p>Power: {card.power}</p>
            <p>HP: {card.hp}</p>
        </div>
    );
};

export default CardDetail;