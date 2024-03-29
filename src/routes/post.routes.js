import { Router } from "express";
import { isAuthenticated } from "../middleware/validatedToken.js";
import { createPosts, deletePosts, editPosts, getPost, getPosts, like } from "../controllers/post.controller.js";
import { createComment, deleteComment } from "../controllers/comment.controller.js";


const router = Router()

//COMMENTS
router.post('/comments/:id',isAuthenticated, createComment);
router.delete('/comments/:id',isAuthenticated, deleteComment);

//POST
router.get('/posts', isAuthenticated, getPosts )
router.get('/posts/:id', isAuthenticated,getPost )
router.post('/user/:id/posts', isAuthenticated, createPosts )
router.delete('/posts/:id', isAuthenticated,deletePosts )
router.put('/posts/:id', isAuthenticated, editPosts )

//LIKE
router.put('/like/:id',isAuthenticated, like)


export default router;