require("dotenv").config();
import mongoose from "mongoose";
import { environmentConfig } from "../constants";

const dbConfig = async () => {
    const url = environmentConfig.MONGOOSE_URL;
    console.log("url-->",url)
    await mongoose.connect(url as string)
        .then(() => {
            console.log("Database Connected Successfully")
        }).catch((error: any) => {
            console.log("Database Connection Failed", error.message)
        })
}

export default dbConfig;