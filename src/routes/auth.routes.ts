import { login, register, verifyOTP } from '../controller/auth.controller';
import { verifyBodyOTP, verifyToken } from '../middleware/authMiddleware';

const authRoutes = require("express").Router()


authRoutes.post("/register", register)
authRoutes.post("/login", login)

authRoutes.post('/verifyOTP/:token?', verifyBodyOTP, verifyOTP);
authRoutes.get('/verifyOTP/:token?', verifyBodyOTP, verifyOTP);
authRoutes.get('/refreshToken', verifyToken, verifyOTP);
// authRoutes.get("")
export default authRoutes