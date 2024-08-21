import { Router } from "express";
import { addScore, getScores } from "../controllers/scores.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = Router();

router.get("/", getScores).post("/add", protectRoute, addScore);

export default router;
