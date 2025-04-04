import express from 'express';

import Deck from '../models/deck.model.js';

const router = express.Router();

// GET request to get all decks
router.get('/get-all-decks', async (req, res) => {
    try {
        const decks = await Deck.find();
        res.status(200).json({ success: true, data: decks });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// GET request to get a deck by its id
router.get('/get-deck/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deck = await Deck.findById(id);
        if (!deck) {
            return res.status(404).json({ success: false, message: 'Deck not found' });
        }
        res.status(200).json({ success: true, data: deck });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// POST request to create a new deck
router.post('/add-deck', async (req, res) => {
    const deck = req.body;

    if (!deck.name) {
        return res.status(400).json({ success: false, message: 'Please provide a name for the deck' });
    }

    const newDeck = new Deck(deck);

    try {
        await newDeck.save();
        res.status(201).json({ success: true, data: newDeck });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// PUT request to update a deck by its id
router.put('/update-deck/:id', async (req, res) => {
    const { id } = req.params;
    const deckUpdates = req.body;

    try {
        const updatedDeck = await Deck.findByIdAndUpdate(id, deckUpdates, { new: true });
        if (!updatedDeck) {
            return res.status(404).json({ success: false, message: 'Deck not found' });
        }
        res.status(200).json({ success: true, data: updatedDeck });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// DELETE request to delete a deck by its id
router.delete('/delete-deck/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
        const deletedDeck = await Deck.findByIdAndDelete(id);
        if (!deletedDeck) {
            return res.status(404).json({ success: false, message: 'Deck not found' });
        }
        res.status(200).json({ success: true, message: 'Deck deleted' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

export default router;