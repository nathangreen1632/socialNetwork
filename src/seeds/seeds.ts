import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User, Thought } from '../models/index.js';
import Reactions from "../models/reactions.js";

dotenv.config();

const MONGO_URI: string = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/socialNetwork_db';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB!');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1); // Exit process with failure
  }
};

const db = mongoose.connection;

const users: {username: string, email: string}[] = [
  {
    username: 'Admin',
    email: 'admin@admin.com',
  },
  {
    username: 'ngreen1632',
    email: 'faux_lucks0v@icloud.com',
  },
  {
    username: 'G-Gang',
    email: 'g_gang@ggang.com',
  },
  {
    username: 'SlimShady',
    email: 'slim@slim_thug.com',
  },
  {
    username: 'SnoopDogg',
    email: 'snoop@snoop_dogg.com',
  },
  {
    username: 'DrDre',
    email: 'dr_dre@dr_dre.com',
  },
  {
    username: 'Ace of Base',
    email: 'ace_of_base@ace_of_base.com',
  },
  {
    username: 'The Notorious B.I.G.',
    email: 'biggy@tupac.com',
  },
  {
    username: 'Tupac',
    email: 'tupac@biggy.com',
  },
];

const thoughts = [
  {
    thoughtText: 'I wonder when the lightbulb will turn on?',
    username: 'Admin',
    reactions: []
  },
  {
    thoughtText: "I can't wait to marry my fiance on June 14th!!",
    username: 'ngreen1632',
    reactions: []
  },
  {
    thoughtText: "I can't wait to see the new Star Wars movie!",
    username: 'G-Gang',
    reactions: []
  },
  {
    thoughtText: "I can't take it anymore!",
    username: 'SlimShady',
    reactions: []
  },
  {
    thoughtText: "What's up my G's?",
    username: 'SnoopDogg',
    reactions: []
  },
  {
    thoughtText: "Yo, SLIM! Calm yourself! You're gonna get yourself killed!",
    username: 'DrDre',
    reactions: []
  },
  {
    thoughtText: "All that she wants... what goes next?",
    username: 'Ace of Base',
    reactions: []
  },
  {
    thoughtText: "We be reppin'!",
    username: 'The Notorious B.I.G.',
    reactions: []
  },
  {
    thoughtText: "You see what this joker wrote?",
    username: 'Tupac',
    reactions: []
  },
];

const reactions = [{
  reactionId: 1,
  reactionBody: 'I think it will turn on soon!',
  username: 'SnoopDogg',
  createdAt: new Date(),
}, {
  reactionId: 2,
  reactionBody: 'You got this son! Be patient!',
  username: 'DrDre',
  createdAt: new Date(),
}, {
  reactionId: 3,
  reactionBody: 'Congrats! I hope you have a great time!',
  username: 'Ace of Base',
  createdAt: new Date(),
}, {
  reactionId: 4,
  reactionBody: 'BAM! Get it poppin!',
  username: 'The Notorious B.I.G.',
  createdAt: new Date(),
}, {
  reactionId: 5,
  reactionBody: 'I can\'t wait either!',
  username: 'Tupac',
  createdAt: new Date(),
}, {
  reactionId: 6,
  reactionBody: 'I hope it\'s good!',
  username: 'SlimShady',
  createdAt: new Date(),
}, {
  reactionId: 7,
  reactionBody: 'You got this son!',
  username: 'SnoopDogg',
  createdAt: new Date(),
}, {
  reactionId: 8,
  reactionBody: 'Slim, you complain to much!',
  username: 'DrDre',
  createdAt: new Date(),
}, {
  reactionId: 9,
  reactionBody: 'Nothin\' much, just chillin\'',
  username: 'Ace of Base',
  createdAt: new Date(),
}, {
  reactionId: 10,
  reactionBody: 'Same here, just trying to make it',
  username: 'The Notorious B.I.G.',
  createdAt: new Date(),
}, {
  reactionId: 11,
  reactionBody: 'Yeah, Slim! Fo rizzle!',
  username: 'SnoopDogg',
  createdAt: new Date(),
}, {
  reactionId: 12,
  reactionBody: 'Slim, you need some antidepressants!',
  username: 'Ace of Base',
  createdAt: new Date(),
}, {
  reactionId: 13,
  reactionBody: 'Uhhhh! Is another baby!',
  username: 'Tupac',
  createdAt: new Date(),
}];

const seedReactions = async () => {
  try {
    await Reactions.deleteMany({});
    const createdReactions = await Reactions.insertMany(reactions);
    console.log('Created reactions...', createdReactions);
  } catch (err) {
    console.error('Error seeding reactions...', err);
  }
};

const seedThoughts = async () => {
  try {
    await Thought.deleteMany({});
    const createdThoughts = await Thought.insertMany(thoughts);
    console.log('Created thoughts...', createdThoughts);
  } catch (err) {
    console.error('Error seeding thoughts...', err);
  }
};

const seedUsers = async () => {
  try {
    await User.deleteMany({});
    const createdUsers = await User.insertMany(users);
    console.log('Created users...', createdUsers);
  } catch (err) {
    console.error('Error seeding users...', err);
  }
};

const seedDatabase = async () => {
  try {
    await seedUsers();
    await seedThoughts();
    await seedReactions();
  } catch (err) {
    console.error('Error seeding database...', err);
  }
};

db.once('open', async () => {
  await seedDatabase();
});

connectDB().catch((err) => {
  console.error('Error connecting to MongoDB:', err);
  process.exit(1);
});