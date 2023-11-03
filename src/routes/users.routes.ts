import { getUserByID } from "../controller/user.controller";

import { Router } from "express";

const userRoutes = Router()

userRoutes.post("user/:id", getUserByID)

export default userRoutes;
