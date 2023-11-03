import { login, register } from '../controller/auth.controller';

const authRoutes = require("express").Router()


authRoutes.post("/register", register)
authRoutes.post("/login", login)

export default authRoutes