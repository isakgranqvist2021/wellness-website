import express from 'express';
const router = express.Router();

import indexController from '../controllers/index/indexController';
import loginController from '../controllers/index/loginController';
import registerController from '../controllers/index/registerController';

router.get('/', indexController);
router.post('/register', registerController);
router.post('/login', loginController);

export default router;