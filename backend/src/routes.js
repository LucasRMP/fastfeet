import { Router } from 'express';

import auth from './app/middlewares/auth';

import UserController from './app/controllers/UserController';
import RecipientController from './app/controllers/RecipientController';
import SessionController from './app/controllers/SessionController';

const router = new Router();

router.post('/auth', SessionController.store);

router.use(auth);

router.post('/users', UserController.store);

router.post('/recipients', RecipientController.store);
router.put('/recipients/:id', RecipientController.update);

// !ERROR: DELETE THIS BEFORE GO TO PRODUCTION
router.get('/auth', SessionController.show);

export default router;
