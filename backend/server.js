import express from 'express';
import dotenv from 'dotenv';

import { connectDB } from './config/db.js';
import cardRoutes from './routes/card.route.js';

// Load environment variables from the .env file
dotenv.config();

// Create an express application
const app = express();

// Allow the server to accept JSON data in the body of the request for parsing
app.use(express.json());

// Use the card routes for requests
app.use('/api', cardRoutes);

app.listen(3000, () => {
    connectDB();
    console.log('Server running on port 3000');
});

