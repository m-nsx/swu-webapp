import express from 'express';

import Card from '../models/card.model.js';

const router = express.Router();

// GET request to get a card by its id
// Return the card with the specified id and its attributes in json format
router.get('/get-card/:id', async (req, res) => {
    const {id} = req.params;

    try {
        // card attributes are stored in the 'data' field
        const card = await Card.findById(id);
        if (!card) {
            return res.status(404).json({ success: false, message: 'Card not found, maybe incorrect id was provided please recheck' });
        }
        res.status(200).json({ success: true, data: card });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// GET request to get all cards
// Return all cards in the database with their attributes in json format
router.get('/get-all-cards', async (req, res) => {
    try {
        // cards attributes are stored in the 'data' field
        const cards = await Card.find();
        res.status(200).json({ success: true, data: cards });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// POST request to create a new card with auto unique id
// Return the newly created card with its attributes in json format
router.post('/add-card', async (req, res) => {
    const card = req.body;

    if (!card.name || !card.type || !card.cost || !card.power || !card.hp || !card.uppower || !card.uphp || !card.aspect || !card.arena || !card.trait || !card.rarity || !card.set || !card.artist || !card.cardno || !card.image) {
        return res.status(400).json({ success: false, message: 'Please provide all card attributes' });
    }

    const newCard = new Card(card);

    try {
        await newCard.save();
        res.status(201).json({ success: true, data: newCard });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// DELETE request to delete a card by its id
// Return a success message if the card is deleted successfully
router.delete('/delete-card/:id', async (req, res) => {
    const {id} = req.params;
    console.log("id : ", id);

    try {
        await Card.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Card deleted' });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Card not found, maybe incorrect id was provided please recheck' });
    }
});

// PUT request to update a card by its id
// Return the updated card with its attributes in json format
router.put('/update-card/:id', async (req, res) => {
    const { id } = req.params;
    const cardUpdates = req.body;

    try {
        const updatedCard = await Card.findByIdAndUpdate(id, cardUpdates, { new: true });
        if (!updatedCard) {
            return res.status(404).json({ success: false, message: 'Card not found, maybe incorrect id was provided please recheck' });
        }
        res.status(200).json({ success: true, data: updatedCard });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// PATCH request to partially update a card by its id
// Return the updated card with its attributes in json format
router.patch('/pupdate-card/:id', async (req, res) => {
    const { id } = req.params;
    const cardUpdates = req.body;

    try {
        const updatedCard = await Card.findByIdAndUpdate(id, { $set: cardUpdates }, { new: true });
        if (!updatedCard) {
            return res.status(404).json({ success: false, message: 'Card not found, maybe incorrect id was provided please recheck' });
        }
        res.status(200).json({ success: true, data: updatedCard });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

export default router;