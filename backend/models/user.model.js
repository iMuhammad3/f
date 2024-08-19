import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            minLength: 6,
        },
        followers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                default: [],
            },
        ],
        following: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                default: [],
            },
        ],
        profileImg: {
            type: String,
            default:
                "https://res.cloudinary.com/dyfmhplwz/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1723910689/blank-profile-2_p1imjt.png",
        },
        whac_img: {
            type: String,
            default:
                "https://res.cloudinary.com/dyfmhplwz/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1723910689/blank-profile-2_p1imjt.png",
        },
        current_streak: {
            type: Number,
            default: 0,
        },
        longest_streak: {
            type: Number,
            default: 0,
        },
        theme: {
            type: String,
            default: "night",
        },
        difficulty: {
            type: String,
            default: "easy",
        },
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
