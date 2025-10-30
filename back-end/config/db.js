import 'dotenv/config';
import mongoose from 'mongoose';

const { MONGO_URL } = process.env;

export const connectDb = async () => {
  if (!MONGO_URL) {
    throw new Error('MONGO_URL is not defined in .env');
  }
  try {
    await mongoose.connect(MONGO_URL);
    console.log('Connected to database');
  } catch (error) {
    console.error('Error connecting to database', error);
    throw error;
  }
};
