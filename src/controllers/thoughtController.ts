import { Request, Response } from 'express';
import Thought from '../models/thoughts.js';
import User from '../models/user.js';

export const getThoughts = async (_req: Request, res: Response): Promise<void> => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    console.error('Error retrieving thoughts...', err);
    res.status(500).json({ message: 'Error retrieving thoughts...', error: err });
    return;
  }
};

export const getThoughtById = async (req: Request, res: Response): Promise<void> => {
  try {
    const thought = await Thought.findById(req.params.id);

    if (!thought) {
      res.status(404).json({ message: 'Thought not found...' });
      return;
    }

    res.json(thought);
  } catch (err) {
    console.error('Error retrieving thought:', err);
    res.status(500).json({ message: 'Error retrieving thought...', error: err });
    return;
  }
};

export const createThought = async (req: Request, res: Response): Promise<void> => {
  try {
    const { thoughtText, username, userId } = req.body;

    if (!thoughtText || !username || !userId) {
      res.status(400).json({ message: 'Missing required fields...' });
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
    console.error('Error creating thought...', err);
    res.status(500).json({ message: 'Error creating thought...', error: err });
    return;
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
    console.error('Error updating thought...', err);
    res.status(500).json({ message: 'Error updating thought...', error: err });
    return;
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
    console.error('Error deleting thought...', err);
    res.status(500).json({ message: 'Error deleting thought. Please try again...', error: err });
    return;
  }
};
