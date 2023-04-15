const mongoose = require("mongoose");
const express = require("express");
const app = express();
app.use(express.json());
const port = 3100;

const highScoreRouter = require("./routes/highscore");
app.use("/score", highScoreRouter);

const uri = "mongodb+srv://root:bVUianBPtRMdlxZ0@highscores.jqbvsrk.mongodb.net/?retryWrites=true&w=majority";

mongoose
    .connect(
        uri,
        {
            useNewUrlParser:true,
            useUnifiedTopology: true,
        }
    )
    .then(() => {
        console.log("Connected to MongoDB!");
        app.listen(port, ()=> {
            console.log(`Server running at http://localhost:${port}`);
        })
    })
    .catch((err) => {
        console.log("Something went terribly wrong!");
        console.log(err);
    });

    module.exports = app;

