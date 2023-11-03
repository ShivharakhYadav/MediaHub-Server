import { Router } from "express";
import { getUserByID } from "../controller/user.controller";
import { verifyToken } from "../middleware/authMiddleware";

const userRoutes = Router()

userRoutes.post("/user/:id", verifyToken, getUserByID)

export default userRoutes;
