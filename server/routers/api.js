import express from 'express';
const router = express.Router();

import profileController from '../controllers/api/profileController';
import serviceController from '../controllers/api/serviceController';

router.get('/profile', profileController);
router.post('/create-service', serviceController.createService);
router.get('/get-services', serviceController.readService);

export default router;