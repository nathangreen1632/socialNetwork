import {Request, Response} from "express";
import User from "../models/user.js";

export const addFriend = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, friendUsername } = req.body; // Get both usernames

    if (!username || !friendUsername) {
      res.status(400).json({ message: "Both usernames are required..." });
      return;
    }

    // Find the user by their username
    const user = await User.findOne({ username });
    if (!user) {
      res.status(404).json({ message: "User not found..." });
      return;
    }

    // Find the friend by their username
    const friend = await User.findOne({ username: friendUsername });
    if (!friend) {
      res.status(404).json({ message: "Friend not found..." });
      return;
    }

    // Add friend ID to user's friend list (only if it's not already there)
    if (!user.friends.includes(friend._id)) {
      user.friends.push(friend._id);
      await user.save();
    }

    res.json({ message: "Friend added successfully!", user });
  } catch (err) {
    console.error("Error adding friend...", err);
    res.status(500).json({ message: "Error adding friend...", error: err });
    return;
  }
};


export const removeFriend = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, friendUsername } = req.body;

    if (!username || !friendUsername) {
      res.status(400).json({ message: "Both usernames are required..." });
      return;
    }

    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      res.status(404).json({ message: "User not found..." });
      return;
    }

    // Find the friend by username
    const friend = await User.findOne({ username: friendUsername });
    if (!friend) {
      res.status(404).json({ message: "Friend not found..." });
      return;
    }

    // Remove friend from user's friends list if they exist
    user.friends = user.friends.filter(friendId => !friendId.equals(friend._id));
    await user.save();

    res.json({ message: "Friend removed successfully!", user });
  } catch (err) {
    console.error("Error removing friend...", err);
    res.status(500).json({ message: "Error removing friend...", error: err });
    return;
  }
};


export const getFriend = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, friendUsername } = req.body;

    if (!username || !friendUsername) {
      res.status(400).json({ message: "Both usernames are required..." });
      return;
    }

    // Find the user and fully populate the friends field
    const user = await User.findOne({ username }).populate("friends");

    if (!user) {
      res.status(404).json({ message: "User not found..." });
      return;
    }

    // Ensure friends are fully populated before filtering
    const friend = user.friends.find((friend) => (friend as any).username === friendUsername);

    if (!friend) {
      res.status(404).json({ message: "Friend not found in user's friend list..." });
      return;
    }

    res.json({ message: "Friend found!", friend });
  } catch (err) {
    console.error("Error retrieving friend...", err);
    res.status(500).json({ message: "Error retrieving friend...", error: err });
    return;
  }
};

export const getAllFriends = async (_req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find().select("username friends").populate("friends", "username");

    if (!users || users.length === 0) {
      res.status(404).json({ message: "No friends found..." });
      return;
    }

    res.json(users);
  } catch (err) {
    console.error("Error retrieving friends...", err);
    res.status(500).json({ message: "Error retrieving friends...", error: err });
    return;
  }
};

