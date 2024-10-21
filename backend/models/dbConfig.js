require("dotenv").config({path : "../.env"})
const mongoose = require("mongoose");


mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log("Couldn't connect to Mongo" + err)
});
