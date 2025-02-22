import express, {Express, Router} from "express";
import userRoutes from "./userRoutes.js";
import thoughtRoutes from "./thoughtRoutes.js";
import reactionRoutes from "./reactionRoutes.js";
import friendRoutes from "./friendRoutes.js";

const app: Express = express();
const router: Router = express.Router();

app.use('/users', userRoutes);
app.use('/thoughts', thoughtRoutes);
app.use('/reactions', reactionRoutes);
app.use('/friends', friendRoutes);

export default router;