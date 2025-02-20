import express, {Router} from "express";
import {
  getThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction
} from "../controllers/thoughtController.js";

const router: Router = express.Router();

// ✅ Get all thoughts
router.get("/", getThoughts);

// ✅ Get a thought by ID
router.get("/:id", getThoughtById);

// ✅ Create a new thought
router.post("/", createThought);

// ✅ Update a thought by ID
router.put("/:id", updateThought);

// ✅ Delete a thought by ID
router.delete("/:id", deleteThought);

// ✅ Add a reaction to a thought
router.post("/:thoughtId/reactions", addReaction);

// ✅ Remove a reaction from a thought
router.delete("/:thoughtId/reactions/:reactionId", removeReaction);

export default router;
