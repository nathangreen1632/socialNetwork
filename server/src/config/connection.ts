import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.MONGODB_URI) {
  throw new Error('MONGODB_URI environment variable is not defined. Please check your .env file.');
}

const MONGO_URI: string = process.env.MONGODB_URI;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as mongoose.ConnectOptions).then(_r => console.log('Connected to MongoDB!'));

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection issue...'));
db.once('open', () => console.log('Connected to MongoDB!'));
