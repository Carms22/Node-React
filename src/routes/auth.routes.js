import { Router } from "express";
import { register, login, logout, profile, myHome, editProfile, followingList, followersList, follow, search } from "../controllers/auth.controller.js";
import { isAuthenticated } from "../middleware/validatedToken.js";


const router = Router();

//USER 
router.post('/register', register);
router.post('/login', login);
//igual a userdetails
router.get('/profile', isAuthenticated, profile );
router.put('/editProfile', isAuthenticated, editProfile );
router.post('/logout',isAuthenticated, logout);

//Follow
router.put("/follow/:id",isAuthenticated, follow);
router.get("/following/:id",isAuthenticated, followingList);
router.get("/followers/:id",isAuthenticated, followersList);


//HOME
router.get('/myHome', isAuthenticated, myHome );
router.get("/search",isAuthenticated, search);


export default router;