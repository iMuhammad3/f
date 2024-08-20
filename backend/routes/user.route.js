import { Router } from "express";
import { updateSettings, updateTheme } from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = Router();

router
    .put("/settings", protectRoute, updateSettings)
    .put("/theme", protectRoute, updateTheme);

export default router;
