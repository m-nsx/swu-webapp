import mongoose from "mongoose";

// Define the schema for the cards collection
// List attributes for the cards collection
const cardSchema = new mongoose.Schema({
    // name of the card (because the name are unique, we can use it as the "primary key")
    name: {
        type: String,
        required: true
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
}, {
    timestamps: true
});

// Create a model for the cards collection
// Specify that mongoose should create a collection called 'cards' in the database using cardSchema schem
const Card = mongoose.model('Card', cardSchema);

// Export the model for external use
export default Card;