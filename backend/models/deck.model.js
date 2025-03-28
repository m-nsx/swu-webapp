import mongoose from "mongoose";

const deckSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    cards: {
        type: String,
        required: false
    },
}, {
    timestamps: true
});

const Deck = mongoose.model('Deck', deckSchema);

export default Deck;