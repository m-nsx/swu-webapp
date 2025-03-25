import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import Card from './models/cards.model.js';

dotenv.config();

const app = express();

// Allow the server to accept JSON data in the body of the request for parsing
app.use(express.json());

// POST request to create a new card with auto unique id
app.post('/api/cards', async (req, res) => {
    const card = req.body;

    if (!card.name || !card.cost || !card.power || !card.hp) {
        return res.status(400).json({ success: false, message: 'Please provide all card attributes' });
    }

    const newCard = new Card(card);

    try {
        await newCard.save();
        res.status(201).json({ success: true, data: newCard });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// DELETE request to delete a card by its id
app.delete('/api/cards/:id', async (req, res) => {
    const {id} = req.params;
    console.log("id : ", id);

    try {
        await Card.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Card deleted' });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Card not found, maybe incorrect id was provided please recheck' });
    }
});

app.listen(3000, () => {
    connectDB();
    console.log('Server running on port 3000');
});

