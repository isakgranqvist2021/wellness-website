import express from 'express';
const router = express.Router();

import profileController from '../controllers/api/profileController';
import serviceController from '../controllers/api/serviceController';
import templateController from '../controllers/api/templateController';
import bookingController from '../controllers/api/bookingController';
import pageSettingsController from '../controllers/api/pageSettingsController';

router.get('/profile', profileController);

router.post('/create-service', serviceController.createService);
router.get('/get-services', serviceController.readService);
router.get('/find-services/:tid', serviceController.findServicesByTemp);
router.delete('/delete-service/:sid', serviceController.deleteService);

router.post('/create-template', templateController.createTemplate);
router.get('/get-templates', templateController.findTemplates);
router.delete('/delete-template/:tid', templateController.deleteTemplate);
router.put('/update-template/:tid', templateController.updateTemplate);

router.get('/get-bookings', bookingController.getBookings);
router.put('/approve-booking', bookingController.approveBooking);
router.put('/update-page-settings', pageSettingsController.updateSettings);

export default router;