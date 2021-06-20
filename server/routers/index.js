import express from 'express';
const router = express.Router();

import indexController from '../controllers/index/indexController';
import loginController from '../controllers/index/loginController';
import registerController from '../controllers/index/registerController';
import contactController from '../controllers/index/contactController';
import bookingController from '../controllers/api/bookingController';

router.get('/content/:accessor', indexController.index);
router.post('/register', registerController.register);
router.post('/login', loginController.login);
router.post('/contact', contactController.contact);
router.get('/programs', bookingController.findTrainings);
router.get('/programs/:program', bookingController.findTrainingsBy);
router.post('/place-booking', bookingController.placeBooking);

export default router;