import {Request, Response} from "express";
import User from "../models/user.js";

export const addFriend = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $addToSet: { friends: req.params.username } },
      { new: true }
    );

    if (!user) {
      res.status(404).json({ message: 'User not found...' });
      return;
    }

    res.json(user);
  } catch (err) {
    console.error('Error adding friend...', err);
    res.status(500).json({ message: 'Error adding friend...', error: err });
    return;
  }
};

export const removeFriend = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $pull: { friends: req.params.username } },
      { new: true }
    );

    if (!user) {
      res.status(404).json({ message: 'User not found...' });
      return;
    }

    res.json(user);
  } catch (err) {
    console.error('Error removing friend...', err);
    res.status(500).json({ message: 'Error removing friend...', error: err });
    return;
  }
};
