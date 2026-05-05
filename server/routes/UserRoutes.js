import express from 'express';
import {registerUser,loginUser,getUserById,getUserResumes} from '../controllers/UserController.js';
import protect from '../middlewares/authMiddleware.js';


const UserRouter=express.Router();
UserRouter.post('/register',registerUser);
UserRouter.post('/login',loginUser);
UserRouter.get('/data',protect,getUserById);
UserRouter.get('/resumes',protect,getUserResumes);

export default UserRouter;