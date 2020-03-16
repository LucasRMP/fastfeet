import { Router } from 'express';
import multer from 'multer';

import auth from './app/middlewares/auth';

import DeliverymanActionController from './app/controllers/DeliverymanActionController';
import DeliveryController from './app/controllers/DeliveryController';
import DeliveredController from './app/controllers/DeliveredController';
import DeliverymanController from './app/controllers/DeliverymanController';
import DeliveryProblemController from './app/controllers/DeliveryProblemController';
import FileController from './app/controllers/FileController';
import ProblemAdminController from './app/controllers/ProblemAdminController';
import RecipientController from './app/controllers/RecipientController';
import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import WithdrawController from './app/controllers/WithdrawController';

import multerConfig from './config/multer';

const router = new Router();
const upload = multer(multerConfig);

router.post('/auth', SessionController.store);

router.get('/deliveryman/:id/deliveries', DeliverymanActionController.index);

router.patch(
  '/deliveryman/:id/deliveries/:delivery_id/withdraw',
  WithdrawController.update
);
router.patch(
  '/deliveryman/:id/deliveries/:delivery_id/deliver',
  upload.single('file'),
  DeliveredController.update
);

router.get('/delivery/:delivery_id/problems', DeliveryProblemController.index);
router.post('/delivery/:delivery_id/problems', DeliveryProblemController.store);

router.use(auth);

router.post('/users', UserController.store);

router.post('/recipients', RecipientController.store);
router.get('/recipients', RecipientController.index);
router.get('/recipients/:id', RecipientController.show);
router.put('/recipients/:id', RecipientController.update);
router.delete('/recipients/:id', RecipientController.delete);

router.post('/deliveryman', DeliverymanController.store);
router.get('/deliveryman', DeliverymanController.index);
router.get('/deliveryman/:id', DeliverymanController.show);
router.put('/deliveryman/:id', DeliverymanController.update);
router.delete('/deliveryman/:id', DeliverymanController.delete);

router.post('/delivery', DeliveryController.store);
router.get('/delivery', DeliveryController.index);
router.get('/delivery/:id', DeliveryController.show);
router.put('/delivery/:id', DeliveryController.update);
router.delete('/delivery/:id', DeliveryController.delete);

router.get('/problems', ProblemAdminController.index);
router.patch(
  '/problem/:problem_id/cancel-delivery',
  ProblemAdminController.update
);

router.post('/files', upload.single('file'), FileController.store);

export default router;
