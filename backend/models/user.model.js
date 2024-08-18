import mongoose from "mongoose";

const difficultiesSchema = new mongoose.Schema({
    easy: { type: Number, default: 0 },
    medium: { type: Number, default: 0 },
    hard: { type: Number, default: 0 },
});

const scoreSchema = new mongoose.Schema({
    speeds: {
        type: [difficultiesSchema],
    },
});

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
            default: "https://res.cloudinary.com/dyfmhplwz/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1723910689/blank-profile-2_p1imjt.png",
        },
        current_streak: {
            type: Number,
            default: 0,
        },
        longest_streak: {
            type: Number,
            default: 0,
        },
        // sample: [ 1min : { speeds: [{impossible: 1 }, { medium: 5 }, { easy: 12 } ] }, 30secs: { speed: [{impossible: 0 }, { medium: 2 }, { easy: 4 } ]} }
        highest_scores: {
            type: Map,
            of: scoreSchema,
            default: {
                "1min": {
                    difficulties: [{ impossible: 0 }, { medium: 0 }, { easy: 0 }],
                },
                "30secs": {
                    difficulties: [{ impossible: 0 }, { medium: 0 }, { easy: 0 }],
                },
            },
        },
    },
    { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
