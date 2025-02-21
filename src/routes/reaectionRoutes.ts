import express, {Router} from "express";
import {getReaction,
        getReactionById,
        createReaction,
        updateReaction,
        deleteReaction,
        addReaction,
        removeReaction
} from "../controllers/reactionController.js";

const router: Router = express.Router();

router.get('/', getReaction);

router.get('/:id', getReactionById);

router.post('/', createReaction);

router.put('/:id', updateReaction);

router.delete('/:id', deleteReaction);

router.post('/:reactionId/reactions', addReaction);

router.delete('/:reactionId/reactions/:reactionId', removeReaction);

export default router;