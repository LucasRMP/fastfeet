import { Router } from 'express';

import auth from './app/middlewares/auth';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

const router = new Router();

router.post('/users', UserController.store);

router.post('/auth', SessionController.store);

router.use(auth);

// !ERROR: DELETE THIS BEFORE GO TO PRODUCTION
router.get('/auth', SessionController.show);

export default router;
