import { Router } from "express";
import { newPost } from "../controller/post.controller";
import { verifyToken } from "../middleware/authMiddleware";
const postRoutes = Router();

postRoutes.post('/newpost', verifyToken, newPost);
// postRoutes.put('/comment', comment);
// postRoutes.post('/userspost', getPostByIds)

export default postRoutes;