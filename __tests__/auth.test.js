import express from "express";
import request from "supertest";
import { describe, it, expect, beforeEach } from "vitest";
import authRoutes from "../backend/routes/auth.route.js"; // adjust the import path
import { protectRoute } from "../backend/middleware/protectRoute.js";

// Mock the middleware and controller functions
vi.mock("../backend/middleware/protectRoute.js", () => ({
    protectRoute: vi.fn((req, res, next) => next())
}));

vi.mock("../backend/controllers/auth.controller.js", () => ({
    getMe: vi.fn((req, res) => res.status(200).json({ message: "This is me" })),
    login: vi.fn((req, res) => res.status(200).json({ token: "fake-jwt-token" })),
    logout: vi.fn((req, res) => res.status(200).json({ message: "Logged out" })),
    signup: vi.fn((req, res) => res.status(201).json({ message: "Account creation successful" })),
}));

describe("Auth Routes", () => {
    let app;

    beforeEach(() => {
        app = express();
        app.use(express.json());
        app.use("/api/auth", authRoutes);
    });

    it("should signup a user", async () => {
        const res = await request(app)
            .post("/api/auth/signup")
            .send({ username: "testuser", password: "password" });

        expect(res.status).toBe(201);
        expect(res.body.message).toBe("Account creation successful");
    });

    it("should login a user", async () => {
        const res = await request(app)
            .post("/api/auth/login")
            .send({ username: "testuser", password: "password" });

        expect(res.status).toBe(200);
        expect(res.body.token).toBe("fake-jwt-token");
    });

    it("should get current user", async () => {
        const res = await request(app)
            .get("/api/auth/me")
            .set("Cookie", "fake-jwt-token");

        expect(res.status).toBe(200);
        expect(res.body.message).toBe("This is me");
    });

    it("should logout a user", async () => {
        const res = await request(app)
            .post("/api/auth/logout");

        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Logged out");
    });
});
