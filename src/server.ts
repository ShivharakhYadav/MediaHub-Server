import express from 'express';
import dbConfig from './configration/dbConfig';
import authRoutes from './routes/authRoutes';
const app = express();

app.use(express.json())
app.use(authRoutes);

const startMediHub = async () => {
    try {
        await dbConfig();
        app.listen(3001, () => console.log("Server Started on port 3001"));
    } catch (error) {
        console.log("Error: ", error)
    }
}

startMediHub();