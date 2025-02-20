import { Request, Response } from 'express';
import User from '../models/user.js';

export const getAllUsers = async (_req: Request, res: Response) => {
  const users = await User.find();
  res.json({ message: 'Users found...', users });
};

export const getUser = async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found...' });
  } else {
    return res.json({ message: 'User found...', user });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const user = new User(req.body);
  await user.save();
  return res.status(201).json({ message: 'User created...', user });
};

export const updateUser = async (req: Request, res: Response) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!user) return res.status(404).json({ message: 'User not found...' });
  return res.json({ message: 'User updated...', user });
};

export const deleteUser = async (req: Request, res: Response) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found...' });
  return res.json({ message: 'User deleted...' });
};
