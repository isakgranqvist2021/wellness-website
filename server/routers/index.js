import express from 'express';
const router = express.Router();

import indexController from '../controllers/index/indexController';
import loginController from '../controllers/index/loginController';
import registerController from '../controllers/index/registerController';
import contactController from '../controllers/index/contactController';

import templateController from '../controllers/api/templateController';
import serviceController from '../controllers/api/serviceController';
import bookingController from '../controllers/api/bookingController';

router.get('/content/:accessor', indexController.index);
router.post('/register', registerController.register);
router.post('/login', loginController.login);
router.get('/get-templates', templateController.findTemplates);
router.get('/find-services/:tid', serviceController.findServicesByTemp);
router.post('/create-booking', bookingController.createBooking);
router.get('/confirm-booking/:confirmKey', bookingController.confirmBooking);
router.post('/contact', contactController.contact);

export default router;