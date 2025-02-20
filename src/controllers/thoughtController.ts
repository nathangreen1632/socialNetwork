import { Request, Response } from 'express';
import Thought from '../models/thoughts.js';
import User from '../models/user.js';

export const getThoughts = async (_req: Request, res: Response): Promise<void> => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    console.error("🔥 Error retrieving thoughts:", err);
    res.status(500).json({ message: 'Error retrieving thoughts', error: err });
  }
};

export const getThoughtById = async (req: Request, res: Response): Promise<void> => {
  try {
    const thought = await Thought.findById(req.params.id);

    if (!thought) {
      res.status(404).json({ message: 'Thought not found' });
      return;
    }

    res.json(thought);
  } catch (err) {
    console.error("🔥 Error retrieving thought:", err);
    res.status(500).json({ message: 'Error retrieving thought', error: err });
  }
};

export const createThought = async (req: Request, res: Response): Promise<void> => {
  try {
    const { thoughtText, username, userId } = req.body;

    if (!thoughtText || !username || !userId) {
      res.status(400).json({ message: 'Missing requirements...' });
      return;
    }

    const newThought = await Thought.create({ thoughtText, username });

    const user = await User.findByIdAndUpdate(
      userId,
      { $push: { thoughts: newThought._id } },
      { new: true }
    );

    if (!user) {
      res.status(404).json({ message: 'User not found...' });
      return;
    }

    res.json(newThought);
  } catch (err) {
    console.error("Error creating thought...", err);
    res.status(500).json({ message: 'Error creating thought...', error: err });
  }
};

export const updateThought = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedThought = await Thought.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedThought) {
      res.status(404).json({ message: 'Thought not found...' });
      return;
    }

    res.json(updatedThought);
  } catch (err) {
    console.error("Error updating thought...", err);
    res.status(500).json({ message: 'Error updating thought...', error: err });
  }
};

export const deleteThought = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedThought = await Thought.findByIdAndDelete(req.params.id);

    if (!deletedThought) {
      res.status(404).json({ message: 'Thought not found..?' });
      return;
    }

    res.json({ message: 'Thought has been deleted...' });
  } catch (err) {
    console.error("Error deleting thought...", err);
    res.status(500).json({ message: 'Error deleting thought. Please try again...', error: err });
  }
};

export const addReaction = async (req: Request, res: Response): Promise<void> => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);

    if (!thought) {
      res.status(404).json({ message: 'No thought found..?' });
      return;
    }

    thought.reactions.push(req.body);
    await thought.save();

    res.json(thought);
  } catch (err) {
    console.error("Error adding reaction:", err);
    res.status(500).json({ message: 'Error adding reaction... Please try again.', error: err });
  }
};

export const removeReaction = async (req: Request, res: Response): Promise<void> => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);

    if (!thought) {
      res.status(404).json({ message: 'Thought not found..?' });
      return;
    }

    const reaction = thought.reactions.id(req.params.reactionId);

    if (!reaction) {
      res.status(404).json({ message: 'Reaction not found..?' });
      return;
    }

    reaction.deleteOne();
    await thought.save();

    res.json(thought);
  } catch (err) {
    console.error("🔥 Error removing reaction... Please try again.", err);
    res.status(500).json({ message: 'Error removing reaction... Please try again.', error: err });
  }
};