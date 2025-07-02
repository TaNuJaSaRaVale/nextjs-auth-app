

import mongoose from 'mongoose';
export async function connect() {
  try {
    const uri = process.env.MONGO_URI;

    if (!uri) {
      throw new Error("MONGO_URI not defined in .env file");
    }

    await mongoose.connect(uri);
    const connection = mongoose.connection;

    connection.on('connected', () => {
      console.log('MongoDB connected successfully');
    });

    connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
      process.exit();
    });

  } catch (error) {
    console.error('MongoDB connection failed:', error);
  }
}