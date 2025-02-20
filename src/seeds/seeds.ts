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
    reactions: ['I hope it does soon!', "I'm not sure what you mean."]
  },
  {
    thoughtText: "I can't wait to marry my fiance on June 14th!!",
    username: 'ngreen1632',
    reactions: ['Congrats!', "I'm so happy for you!"]
  },
  {
    thoughtText: "I can't wait to see the new Star Wars movie!",
    username: 'G-Gang',
    reactions: ["I'm excited too!", "I can't wait to see it too!"]
  },
  {
    thoughtText: "I can't take it anymore!",
    username: 'SlimShady',
    reactions: ["I'm sorry to hear that.", "I hope you feel better soon."]
  },
  {
    thoughtText: "What's up my G's?",
    username: 'SnoopDogg',
    reactions: ["What's up?", "Not much, just chilling."]
  },
  {
    thoughtText: "Yo, SLIM! Calm yourself! You're gonna get yourself killed!",
    username: 'DrDre',
    reactions: ["Nah, I'm good.", "I'm just trying to stay calm."]
  },
  {
    thoughtText: "All that she wants... what goes next?",
    username: 'Ace of Base',
    reactions: ["Is another baby!", "I love this song!"]
  },
  {
    thoughtText: "I'm gonna smoke that fool!",
    username: 'The Notorious B.I.G.',
    reactions: ["Ah, hell nah!", "I'm gonna smoke you!"]
  },
  {
    thoughtText: "You see what this joker wrote?",
    username: 'Tupac',
    reactions: ["Yeah, I saw it.", "I'm gonna smoke you!"]
  },
];

const seedDatabase = async () => {
  try {
    await User.deleteMany({});
    await Thought.deleteMany({});

    const createdUsers = await User.insertMany(users);
    console.log('Created users...', createdUsers);

    const createdThoughts = await Thought.insertMany(thoughts);
    console.log('Created thoughts...', createdThoughts);

    process.exit();
  } catch (err) {
    console.error('Error seeding database...', err);
    process.exit(1);
  }
};

db.once('open', async () => {
  await seedDatabase();
});