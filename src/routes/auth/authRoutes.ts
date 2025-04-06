import express from 'express';
import { forgotPasswordController, signInController, signUpController, verifyemailController } from '../../controllers/authControllers';
const authRouter = express.Router();

authRouter.post('/signup', signUpController);
authRouter.post('/signin', signInController);
authRouter.post('/forgot', forgotPasswordController);
authRouter.post('/verify-email', verifyemailController);

export default authRouter;