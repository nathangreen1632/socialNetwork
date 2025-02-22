import express, { Router } from "express";
import { addFriend, removeFriend } from "../controllers/friendController.js";

const router: Router = express.Router();

router.post('/username', addFriend);

router.delete('/username', removeFriend);

export default router;