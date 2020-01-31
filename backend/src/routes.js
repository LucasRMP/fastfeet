import { Router } from 'express';
import multer from 'multer';

import auth from './app/middlewares/auth';

import DeliverymanController from './app/controllers/DeliverymanController';
import FileController from './app/controllers/FileController';
import RecipientController from './app/controllers/RecipientController';
import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';

import multerConfig from './config/multer';

const router = new Router();
const upload = multer(multerConfig);

router.post('/auth', SessionController.store);

router.use(auth);

router.post('/users', UserController.store);

router.post('/recipients', RecipientController.store);
router.put('/recipients/:id', RecipientController.update);

router.post('/deliverymans', DeliverymanController.store);
router.get('/deliverymans', DeliverymanController.index);
router.get('/deliverymans/:id', DeliverymanController.show);
router.put('/deliverymans/:id', DeliverymanController.update);
router.delete('/deliverymans/:id', DeliverymanController.delete);

router.post('/files', upload.single('file'), FileController.store);

export default router;
