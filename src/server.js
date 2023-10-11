const dbConfig = require("./configration/dbConfig")
const express = require("express");
const app = express();


const startMediHub = async () => {
    try {
        await dbConfig();
        app.listen(3001, () => console.log("Server Started on port 3001"));
    } catch (error) {
        console.log("Error: ", error)
    }
}

startMediHub();