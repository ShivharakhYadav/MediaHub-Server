import { Router } from "express";
import { newPost } from "../controller/post.controller";
const postRoutes = Router();

postRoutes.post('/newpost', newPost);
// postRoutes.put('/comment', comment);
// postRoutes.post('/userspost', getPostByIds)

export default postRoutes;