import { Router } from 'express';
import { getCurrentUser, register, login } from './auth.controller.js';
import { isGuest, authTokenMiddleware } from '../../middlewares/auth.middleware.js';
import { validate } from '../../middlewares/validate.js';
import { registerSchema, loginSchema } from './auth.schema.js';

const router = Router();

router.get('/me', authTokenMiddleware, getCurrentUser);
router.post('/register', isGuest, validate(registerSchema), register);
router.post('/login', isGuest, validate(loginSchema), login);

export default router;