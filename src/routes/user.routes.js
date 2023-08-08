import { Router } from 'express';
import { validateSchema } from '../middlewares/validateSchema.middleware.js';
import signUpSchema from '../schemas/signUpSchema.js';
import { createUser, userLogin } from '../controllers/userController.js';
import signInSchema from '../schemas/signInSchema.js';


const userRouter = Router();

userRouter.post('/signup', validateSchema(signUpSchema), createUser);
userRouter.post('/login',  validateSchema(signInSchema), userLogin);

export default userRouter;