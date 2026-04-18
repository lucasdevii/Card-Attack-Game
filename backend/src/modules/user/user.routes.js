import { Router } from 'express';
import { userCadaster } from './user.controller.js';
import { isGuest } from '../../middlewares/auth.middleware.js';

const router = Router();

router.post('/cadaster', isGuest, userCadaster);

export default router;