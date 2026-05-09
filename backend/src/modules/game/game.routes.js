import { Router } from 'express';
import { isAuth } from '../../middlewares/auth.middleware.js';
import { gameSearch, gameSearchStop } from './game.controller.js';

const router = Router();

router.post('/matchmaking/search', isAuth, gameSearch)
router.delete('/matchmaking/search', isAuth, gameSearchStop)


export default router;