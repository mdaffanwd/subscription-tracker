import mongoose from 'mongoose';
import { DB_URI, NODE_ENV } from '../config/env.js';

if (!DB_URI) {
  throw new Error(
    'Please define the MONGODB_URI env var inside .env.development/production.local',
  );
}

const DB_NAME = 'backendJSM'

const connectToDatabase = async () => {
  try {
    await mongoose.connect(`${DB_URI}/${DB_NAME}`);
  } catch (error) {
    console.log('Error connecting to DB', error);
    process.exit(1);
  }
};

export { connectToDatabase };
