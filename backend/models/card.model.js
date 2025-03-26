import mongoose from "mongoose";

// Define the schema for the cards collection
// List attributes for the cards collection
const cardSchema = new mongoose.Schema({
    // name of the card (because the name are unique, we can use it as the "primary key")
    name: {
        type: String,
        required: true
    },
    // type of the card
    type: {
        type: String,
        required: false
    },
    // cost of the card
    cost: {
        type: Number,
        required: false
    },
    // power of the card
    power: {
        type: Number,
        required: false
    },
    // hit points of the card
    hp: {
        type: Number,
        required: false
    },
    uppower: {
        type: Number,
        required: false
    },
    uphp: {
        type: Number,
        required: false
    },
    aspect: {
        type: String,
        required: false
    },
    arena: {
        type: String,
        required: false
    },
    trait: {
        type: String,
        required: false
    },
    rarity: {
        type: String,
        required: false
    },
    set: {
        type: String,
        required: false
    },
    artist: {
        type: String,
        required: false
    },
    cardno: {
        type: Number,
        required: false
    },
    image: {
        type: String,
        required: false
    },
}, {
    timestamps: true
});

// Create a model for the cards collection
// Specify that mongoose should create a collection called 'cards' in the database using cardSchema schem
const Card = mongoose.model('Card', cardSchema);

// Export the model for external use
export default Card;