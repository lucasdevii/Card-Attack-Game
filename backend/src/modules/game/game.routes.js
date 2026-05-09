import { Router } from 'express';
import { isAuth } from '../../middlewares/auth.middleware';
import { seekingGame, seekingGameStop } from './game.controller';

const router = Router();

router.post('/matchmaking/search', isAuth, seekingGame)
router.delete('/mathmaking/search', isAuth, seekingGame)


export default router;