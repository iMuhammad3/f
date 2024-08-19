import { Router } from "express";
import { updateSettings } from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = Router();

router.put("/settings", protectRoute, updateSettings);

export default router;
