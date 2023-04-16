const { ObjectId } = require("mongodb");
const HighScore = require("../models/HighScore");

const highScoreController = {
    getAllHighScores(req, res) {
        HighScore.find({})
        .select("-__v")
        .sort({userScore: -1})
        .then((returnedHighScores) => res.json(returnedHighScores))
        .catch((err) => {
            res.status(400).json(err);
        });
    },

    addHighScore(req, res) {
        const body = req.body;
        HighScore.find({})
        .select("-__v")
        .sort({userScore: -1})
        // .then((returnedHighScores) => res.json(returnedHighScores))

        .then((scoresArray) => {
            const length = scoresArray.length;
            const userScore = body.userScore;
            console.log(body);
            let lowScore;
            if (scoresArray[length - 1] >= 0)
                 lowScore = scoresArray[length - 1].userScore;
            else
                lowScore = false;
            


            if (length < 11) 
                return "add";

            if (userScore < lowScore)
                return scoresArray[length-1]._id;
                
            let foundScore = false;
            for (const [index, scoreInfo] of scoresArray.entries()) {
                if (userScore > scoreInfo.userScore && index < length - 2) {
                    foundScore = scoresArray[length-2]._id;
                    break;
                }
            }
            if (foundScore) {
                return foundScore;
            }

            return false;
        })
        .then((result) => {
//Score doesn't effect database
            if (body.userInitials.length != 3)
                return res.status(400).json({message: "username must be 3 characters"})
            if (!result)
                return res.status(200).json({message: "not good/bad enough to change anything"});

//Add new score when not at max
            else if (result == "add") {
                HighScore.create(body)
                .then((addedInfo) => {
                    return res.status(200).json({ message: "Added score successfully!", newScore: addedInfo})
                })
                .catch((err) => {
                    res.status(400).json({message: "Error adding new highs core!", error: req.body});
                });
            }
            else {
                HighScore.findOneAndUpdate(
                    {_id: result},
                    {
                        $set: {
                            userInitials: body.userInitials,
                            userScore: body.userScore,
                        },
                    },
                    { new: true }
                ).then((results) => {
                    return res.status(200).json({message: "Score Added", newScore: results});
                }).catch((err) => {
                    res.status(400).json({message: "Error updating highs core!", error: err});
                });
            }
        })
        .catch((err) => {
            console.log(err)
            res.status(400).json(err);
        });
    },
};

module.exports = highScoreController;