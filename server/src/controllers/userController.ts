import { Request, Response } from 'express';
import User from '../models/user.js';
import bcrypt from 'bcrypt'; // Ensure bcrypt is installed for password hashing

export const getAllUsers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error('Error retrieving users...', err);
    res.status(500).json({ message: 'Error retrieving users...', error: err });
    return;
  }
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(404).json({ message: 'User not found...' });
      return;
    }

    res.json(user);
  } catch (err) {
    console.error('Error retrieving user:', err);
    res.status(500).json({ message: 'Error retrieving user...', error: err });
    return;
  }
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password, name, friends } = req.body;

    if (!username || !email || !password || !name) {
      res.status(400).json({ message: 'Missing required fields...' });
      return;
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 4);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      name,
      friends: friends || [] // Default to an empty array if no friends provided
    });

    res.json(newUser);
  } catch (err) {
    console.error('Error creating user...', err);
    res.status(500).json({ message: 'Error creating user...', error: err });
    return;
  }
};


export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      res.status(400).json({ message: 'Missing required fields... username, email, password are required' });
      return;
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { username, email, password },
      { new: true }
    );

    if (!user) {
      res.status(404).json({ message: 'User not found...' });
      return;
    }

    res.json(user);
  } catch (err) {
    console.error('Error updating user...', err);
    res.status(500).json({ message: 'Error updating user...', error: err });
    return;
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      res.status(404).json({ message: 'User not found...' });
      return;
    }

    res.json(user);
  } catch (err) {
    console.error('Error deleting user...', err);
    res.status(500).json({ message: 'Error deleting user...', error: err });
    return;
  }
};

export const deleteAllUsers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const result = await User.deleteMany({});

    res.json(result);
  } catch (err) {
    console.error('Error deleting all users...', err);
    res.status(500).json({ message: 'Error deleting all users...', error: err });
    return;
  }
};

