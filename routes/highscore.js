const express = require("express");
const router = express.Router();

const {
    getAllHighScores,
    addHighScore
} = require("../controllers/highscore-controller");

router.route("/").get(getAllHighScores).post(addHighScore);

module.exports = router;