import express from 'express';
import dotenv from 'dotenv';
import os from 'os';
import cors from 'cors';

import { connectDB } from './config/db.js';
import cardRoutes from './routes/card.route.js';

// Load environment variables from the .env file
dotenv.config();

// Create an express application
const app = express();
const PORT = process.env.BACK_PORT || 5000;

app.use(cors());

// Allow the server to accept JSON data in the body of the request for parsing
app.use(express.json());

// Use the card routes for requests
app.use('/api', cardRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log('Server accessible on http://localhost:' + PORT + ' if you are on local machine');
    const networkInterfaces = os.networkInterfaces();
    const localIp = Object.values(networkInterfaces)
        .flat()
        .find((iface) => iface.family === 'IPv4' && !iface.internal).address;

    console.log(`Server accessible on http://${localIp}:${PORT} for devices on the same local network`);
});