import express from "express";
import {
    getMe,
    login,
    logout,
    signup,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();

router
    .get("/me", protectRoute, getMe)
    .post("/signup", signup)
    .post("/login", login)
    .post("/logout", logout);

export default router;
