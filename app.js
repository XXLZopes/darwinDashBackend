const mongoose = require("mongoose");
const express = require("express");

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const app = express();
app.use(express.json());
const PORT = 3100;


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
        app.listen(PORT, ()=> {
            console.log(`Server running at http://localhost:${PORT}`);
        })
    })
    .catch((err) => {
        console.log("Something went terribly wrong!");
        console.log(err);
    });

    module.exports = app;

