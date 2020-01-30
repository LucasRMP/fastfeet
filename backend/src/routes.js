import { Router } from 'express';

const router = new Router();

router.get('/', (req, res) => {
  return res.json({ root: true });
});

export default router;
