import { login, register, verifyOTP } from '../controller/auth.controller';
import { verifyBodyOTP } from '../middleware/authMiddleware';

const authRoutes = require("express").Router()


authRoutes.post("/register", register)
authRoutes.post("/login", login)

authRoutes.post('/verifyOTP/:token?', verifyBodyOTP, verifyOTP);
authRoutes.get('/verifyOTP/:token?', verifyBodyOTP, verifyOTP);
export default authRoutes