import express from 'express';
import dbConfig from './configration/dbConfig';
import authRoutes from './routes/authRoutes';
import { environmentConfig } from "./constants/index";
import { Request, Response } from 'express'
const app = express();

app.use(express.json())
app.use((req: Request, res: Response, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    // res.setHeader('Access-Control-Allow-Credentials', true);
    next();
})
app.use("/auth", authRoutes);

const startMediHub = async () => {
    try {
        await dbConfig();
        app.listen(environmentConfig?.PORT, () => console.log(`Server Started on port ${environmentConfig?.PORT}`));
    } catch (error) {
        console.log("Error: ", error)
    }
}

startMediHub();