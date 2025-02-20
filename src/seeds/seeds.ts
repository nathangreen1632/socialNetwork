import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User, Thought } from '../models/index.js';

dotenv.config();

const MONGO_URI: string = process.env.MONGODB_URI ?? '';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as mongoose.ConnectOptions).then(() => console.log('Connected to MongoDB!'));

const db = mongoose.connection;

const users: {username: string, email: string}[] = [
  {
    username: 'Admin',
    email: 'admin@admin.com',
  },
  {
    username: 'ngreen1632',
    email: 'faux_lucks0v@icloud.com',
  }
];

const thoughts = [
  {
    thoughtText: "I wonder when the lightbulb will turn on?",
    username: "Admin",
    reactions: []
  },
  {
    thoughtText: "I can't wait to marry my fiance on June 14th!!",
    username: "ngreen1632",
    reactions: []
  }
];

const seedDatabase = async () => {
  try {
    await User.deleteMany({});
    await Thought.deleteMany({});

    const createdUsers = await User.insertMany(users);
    console.log('Created users...:', createdUsers);

    const createdThoughts = await Thought.insertMany(thoughts);
    console.log('Created thoughts...:', createdThoughts);

    process.exit();
  } catch (err) {
    console.error('Error seeding...:', err);
    process.exit(1);
  }
};

db.once('open', async () => {
  await seedDatabase();
});