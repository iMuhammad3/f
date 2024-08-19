import bcrypt from "bcrypt";

import generateToken from "../utils/generateToken.js";
import User from "../models/user.model.js";

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        const match = await bcrypt.compare(password, user?.password || "");

        if (!user || !match) {
            return res
                .status(400)
                .json({ error: "Invalid username or password" });
        }

        generateToken(user._id, res);

        res.status(200).json({ message: "You have logged in successfully" });
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const signup = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username.trim() || !password.trim()) {
            return res
                .status(400)
                .json({ error: "Username or Password fields cannot be blank" });
        }
        if (username.match(" ")) {
            return res
                .status(400)
                .json({ error: "Username should not contain spaces." });
        }
        if (username.length < 4) {
            return res
                .status(400)
                .json({ error: "Username must be at least 4 characters long" });
        }
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: "Username already exist" });
        }
        if (password.length < 6) {
            return res
                .status(400)
                .json({ error: "Password must be at least 6 characters long" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            username,
            password: hashedPassword,
        });
        generateToken(newUser._id, res);
        res.status(200).json({ message: "Account creation successful" });
    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const logout = async (req, res) => {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
};

export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        res.status(200).json(user);
    } catch (error) {
        console.log("Error in getMe controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
