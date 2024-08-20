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
                "https://res.cloudinary.com/dyfmhplwz/image/upload/v1724153805/blank-profile-2_zspxmn.png",
        },
        whacImg: {
            type: String,
            default:
                "https://res.cloudinary.com/dyfmhplwz/image/upload/v1724001654/messi_lo8hct.jpg",
        },
        currentStreak: {
            type: Number,
            default: 0,
        },
        longestStreak: {
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
        lastPlayedDate: {
            type: Date
        }
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
