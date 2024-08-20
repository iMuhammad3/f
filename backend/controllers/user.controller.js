import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import User from "../models/user.model.js";

export const updateSettings = async (req, res) => {
    const { difficulty, currentPassword, newPassword } = req.body;
    let { whacImg, profileImg } = req.body;

    console.log(whacImg);
    console.log(profileImg);

    const userId = req.user._id;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (
            (!newPassword && currentPassword) ||
            (!currentPassword && newPassword)
        ) {
            return res.status(400).json({
                error: "Please provide both current password and new password",
            });
        }

        if (currentPassword && newPassword) {
            const isMatch = await bcrypt.compare(
                currentPassword,
                user.password
            );
            if (!isMatch)
                return res
                    .status(400)
                    .json({ error: "Current password is incorrect" });
            if (newPassword.length < 6) {
                return res.status(400).json({
                    error: "Password must be at least 6 characters long",
                });
            }

            user.password = await bcrypt.hash(newPassword, 10);
        }

        // if (whacImg) {
        // 	if (user.whacImg) {
        // 		// https://res.cloudinary.com/dyfqon1v6/image/upload/v1712997552/zmxorcxexpdbh8r0bkjb.png
        // 		await cloudinary.uploader.destroy(user.whacImg.split("/").pop().split(".")[0]);
        // 	}

        // 	const uploadedResponse = await cloudinary.uploader.upload(whacImg);
        // 	whacImg = uploadedResponse.secure_url;

        // }
        // if (profileImg) {
        // 	if (user.profileImg) {
        // 		// https://res.cloudinary.com/dyfqon1v6/image/upload/v1712997552/zmxorcxexpdbh8r0bkjb.png
        // 		await cloudinary.uploader.destroy(user.profileImg.split("/").pop().split(".")[0]);
        // 	}

        // 	const uploadedResponse = await cloudinary.uploader.upload(profileImg);
        // 	profileImg = uploadedResponse.secure_url;
        // }
        user.difficulty = difficulty || user.difficulty;
        user.whacImg = whacImg || user.whacImg;
        user.profileImg = profileImg || user.profileImg;

        await user.save();

        res.status(200).json({ message: "User settings updated" });
    } catch (error) {
        console.log("Error in updateSettings: ", error.message);
        res.status(500).json({ error: error.message });
    }
};

export const updateTheme = async (req, res) => {
    const { theme } = req.body;
    const userId = req.user._id;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(401).json({ error: "User not found" });
        }
        await User.updateOne({ _id: userId }, { theme });
		console.log(user.theme);
		
        res.status(200).json({ message: "Theme updated" });
    } catch (error) {
        console.log("Error in updateTheme: ", error.message);
        res.status(500).json({ error: error.message });
    }
};
