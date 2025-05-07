import express from 'express';
import authRouter from './auth/authRoutes';
import connectionRouter from './connections/connectionRoutes';
const router = express.Router();

router.use('/auth', authRouter);
router.use('/connections', connectionRouter);

export default router;