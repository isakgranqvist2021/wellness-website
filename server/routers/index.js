import express from 'express';
const router = express.Router();

import indexController from '../controllers/index/indexController';
import loginController from '../controllers/index/loginController';
import registerController from '../controllers/index/registerController';

import templateController from '../controllers/api/templateController';
import serviceController from '../controllers/api/serviceController';
import bookingController from '../controllers/api/bookingController';
import pageContentController from '../controllers/api/pageContentController';

router.get('/all-content', indexController);
router.get('/page-content/:field', pageContentController.getContent);
router.post('/register', registerController);
router.post('/login', loginController);
router.get('/get-templates', templateController.findTemplates);
router.get('/find-services/:tid', serviceController.findServicesByTemp);
router.post('/create-booking', bookingController.createBooking);
router.get('/confirm-booking/:confirmKey', bookingController.confirmBooking);

export default router;