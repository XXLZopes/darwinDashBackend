const { Schema, model, Types} = require("mongoose");
const HighScoreSchema = new Schema({
    userInitials: {
        type: String,
        required: true,
        maxlength: 3,
        default: "NON",
    },
    userScore: {
        type: Number,
        required: true,
    },
},
);

const HighScore = model("HighScore", HighScoreSchema);
module.exports = HighScore;