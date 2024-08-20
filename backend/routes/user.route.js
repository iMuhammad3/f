import { Router } from "express";
import {
    updateSettings,
    updateStreak,
    updateTheme,
} from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = Router();

router
    .post("/streak", protectRoute, updateStreak)
    .put("/settings", protectRoute, updateSettings)
    .put("/theme", protectRoute, updateTheme);

export default router;
