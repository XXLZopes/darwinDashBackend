const mongoose = require("mongoose");
const express = require("express");

require('dotenv').config();

// if (process.env.NODE_ENV !== "production") {
//     require("dotenv").config();
// }

const app = express();
app.use(express.json());

app.use(express.static('public'));
const PORT = process.env.PORT || 3100;


const highScoreRouter = require("./routes/highscore");
app.use("/score", highScoreRouter);

const uri = process.env.MONGODB_URI;

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

