import Scores from "../models/scores.model.js";
import User from "../models/user.model.js";

export const getScores = async (req, res) => {
    try {
        const scores = await Scores.find().populate({
            path: "user",
            select: "username profileImg currentStreak longestStreak",
        });
        if (scores.length === 0) {
            return res.status(200).json({ message: "No scores available" });
        }
        res.status(200).json(scores);
    } catch (error) {
        console.log("Error in getScores: ", error);
        res.status(500).json({ error: "Interal server error" });
    }
};

export const addScore = async (req, res) => {
    const { difficulty, score } = req.body;
    
    if (!difficulty || !score) {
        return res
            .status(400)
            .json({ error: "Please provide score and difficulty" });
    }
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const scores = await Scores.findOne({ user: user._id });
        if (scores) { 
            if (difficulty === "easy" && score > scores.easy) scores.easy = parseInt(score);
            if (difficulty === "medium" && score > scores.medium) scores.medium = parseInt(score);
            if (difficulty === "hard" && score > scores.hard) scores.hard = parseInt(score);
            await scores.save();
            return res.status(200).json(scores);
        }
        const newScores = new Scores({
            user: user._id,
            easy: 0,
            medium: 0,
            hard: 0,
        });

        if (difficulty === "easy") newScores.easy = parseInt(score);
        if (difficulty === "medium") newScores.medium = parseInt(score);
        if (difficulty === "hard") newScores.hard = parseInt(score);
        await newScores.save();
        res.status(200).json(newScores);
    } catch (error) {
        console.log("Error in addScore: ", error);
        res.status(500).json({ error: "Interal server error" });
    }
};
