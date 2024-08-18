import { Schema } from "mongoose";

// sample: [ 1min : { speeds: [{impossible: 1 }, { medium: 5 }, { easy: 12 } ] }, 30secs: { speed: [{impossible: 0 }, { medium: 2 }, { easy: 4 } ]} }

const ScoreSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    speeds: {
        type: [difficultiesSchema],
    },
});

const difficultiesSchema = new mongoose.Schema({
    easy: { type: Number, default: 0 },
    medium: { type: Number, default: 0 },
    hard: { type: Number, default: 0 },
});

const Scores = mongoose.model("Score", ScoreSchema);

export default Scores;