import express, {Router} from 'express';
import {
  getThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction
} from '../controllers/thoughtController.js';

const router: Router = express.Router();

router.get('/', getThoughts);

router.get('/:id', getThoughtById);

router.post('/', createThought);

router.put('/:id', updateThought);

router.delete('/:id', deleteThought);

router.post('/:thoughtId/reactions', addReaction);

router.delete('/:thoughtId/reactions/:reactionId', removeReaction);

export default router;
