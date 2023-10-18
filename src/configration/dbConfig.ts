require("dotenv").config();
import mongoose from "mongoose";

const dbConfig = async () => {
    const url = process.env.url;
    await mongoose.connect(url as string)
        .then(() => {
            console.log("Database Connected Successfully")
        }).catch((error: any) => {
            console.log("Database Connection Failed", error.message)
        })
}

export default dbConfig;