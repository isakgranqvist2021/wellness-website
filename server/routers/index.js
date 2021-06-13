import express from 'express';
const router = express.Router();

import indexController from '../controllers/index/index';
import login from '../controllers/index/login';
import register from '../controllers/index/register';

router.get('/', indexController.action);
router.post('/register', register);
router.post('/login', login);

export default router;