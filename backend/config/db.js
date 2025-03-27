import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

const connectDB = async () => {
    const mongoServer = await MongoMemoryServer.create({
        instance: {
            dbPath: './backend/data', // Specify the path to store the database files
            dbName: 'swudb', // Specify the database name
        },
    });

    try {
        const uri = mongoServer.getUri();
        const conn = await mongoose.connect(uri, {});

        console.log(`MongoDB Connected: ${conn.connection.host}`);

        // Vérifier et créer une collection pour s'assurer que la base de données est créée
        const db = conn.connection.db;
        const collections = await db.listCollections().toArray();
        if (collections.length === 0) {
            await db.createCollection('defaultCollection');
            console.log('Default collection created to ensure database creation.');
        }
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;