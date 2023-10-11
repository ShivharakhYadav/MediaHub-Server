require("dotenv").config();
const mongoose = require("mongoose");

const dbConfig = async () => {
    const url = process.env.url;
    await mongoose.connect(url)
        .then(() => {
            console.log("Database Connected Successfully")
        }).catch((error) => {
            console.log("Database Connection Failed", error.message)
        })
}

module.exports = dbConfig;