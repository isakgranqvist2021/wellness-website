import express from 'express';
const router = express.Router();

import profileController from '../controllers/api/profile';

router.get('/profile', profileController);

export default router;