import express from 'express';
const router = express.Router();

import indexController from '../controllers/index';

router.get('/', indexController.action);

export default router;