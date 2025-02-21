import { Request, Response } from 'express';
import Reaction from '../models/reactions.js'
import User from "../models/user.js";

export const getReaction = async (_req: Request, res: Response): Promise<void> => {
  try {
    const reactions = await Reaction.find();
    res.json(reactions);
  } catch (err) {
    console.error('Error retrieving reactions...', err);
    res.status(500).json({message: 'Error retrieving reactions...', error: err});
    return;
  }
};

export const getReactionById = async (req: Request, res: Response): Promise<void> => {
  try {
    const reaction = await Reaction.findById(req.params.id);

    if (!reaction) {
      res.status(404).json({message: 'Reaction not found...'});
      return;
    }

    res.json(reaction);
  } catch (err) {
    console.error('Error retrieving reaction:', err);
    res.status(500).json({message: 'Error retrieving reaction...', error: err});
    return;
  }
};

export const createReaction = async (req: Request, res: Response): Promise<void> => {
  try {
    const {reactionBody, username, userId} = req.body;

    if (!reactionBody || !username || !userId) {
      res.status(400).json({message: 'Missing required fields...'});
      return;
    }

    const newReaction = await Reaction.create({reactionBody, username});

    const user = await User.findByIdAndUpdate(
      userId,
      {$push: {reactions: newReaction._id}},
      {new: true}
    );

    if (!user) {
      res.status(404).json({message: 'User not found...'});
      return;
    }

    res.json(newReaction);
  } catch (err) {
    console.error('Error creating reaction...', err);
    res.status(500).json({message: 'Error creating reaction...', error: err});
    return;
  }
};

export const updateReaction = async (req: Request, res: Response): Promise<void> => {
  try {
    const {reactionBody, username} = req.body;

    if (!reactionBody || !username) {
      res.status(400).json({message: 'Missing required fields...'});
      return;
    }

    const updatedReaction = await Reaction.findByIdAndUpdate(
      req.params.id,
      {reactionBody, username},
      {new: true}
    );

    if (!updatedReaction) {
      res.status(404).json({message: 'Reaction not found...'});
      return;
    }

    res.json(updatedReaction);
  } catch (err) {
    console.error('Error updating reaction...', err);
    res.status(500).json({message: 'Error updating reaction...', error: err});
    return;
  }
};

export const deleteReaction = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedReaction = await Reaction.findByIdAndDelete(req.params.id);

    if (!deletedReaction) {
      res.status(404).json({message: 'Reaction not found...'});
      return;
    }

    res.json(deletedReaction);
  } catch (err) {
    console.error('Error deleting reaction...', err);
    res.status(500).json({message: 'Error deleting reaction...', error: err});
    return;
  }
};

export const addReaction = async (req: Request, res: Response): Promise<void> => {
  try {
    const {reactionBody, username} = req.body;

    if (!reactionBody || !username) {
      res.status(400).json({message: 'Missing required fields...'});
      return;
    }

    const newReaction = await Reaction.create({reactionBody, username});

    const user = await User.findByIdAndUpdate(
      req.params.userId,
      {$push: {reactions: newReaction._id}},
      {new: true}
    );

    if (!user) {
      res.status(404).json({message: 'User not found...'});
      return;
    }

    res.json(newReaction);
  } catch (err) {
    console.error('Error adding reaction...', err);
    res.status(500).json({message: 'Error adding reaction...', error: err});
    return;
  }
};

export const removeReaction = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      {$pull: {reactions: req.params.reactionId}},
      {new: true}
    );

    if (!user) {
      res.status(404).json({message: 'User not found...'});
      return;
    }

    const deletedReaction = await Reaction.findByIdAndDelete(req.params.reactionId);

    if (!deletedReaction) {
      res.status(404).json({message: 'Reaction not found...'});
      return;
    }

    res.json(deletedReaction);
  } catch (err) {
    console.error('Error removing reaction...', err);
    res.status(500).json({message: 'Error removing reaction...', error: err});
    return;
  }
};

