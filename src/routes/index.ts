import express, {Express, Router} from "express";
import userRoutes from "./userRoutes.js";
import thoughtRoutes from "./thoughtRoutes.js";
import reactionRoutes from "./reaectionRoutes.js";

const app: Express = express();
const router: Router = express.Router();

app.use('.api/users', userRoutes);
app.use('.api/thoughts', thoughtRoutes);
app.use('.api/reactions', reactionRoutes);

export default router;