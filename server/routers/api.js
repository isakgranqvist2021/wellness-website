import express from 'express';
import multer from 'multer';
import path from 'path';

const router = express.Router();
const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, 'uploads/')
        },
        filename(req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
        }
    })
});

import profileController from '../controllers/api/profileController';
import contentController from '../controllers/api/contentController';
import imagesController from '../controllers/api/imagesController';
import contactController from '../controllers/api/contactController';
import bookingController from '../controllers/api/bookingController';

router.get('/profile', profileController.profile);

router.put('/update-content', contentController.updateContent);
router.put('/update-extras', contentController.updateExtras);
router.put('/upload-img', upload.single('file'), contentController.uploadImg);
router.get('/accessors', contentController.accessors);
router.get('/content/:id', contentController.getContent);

router.get('/all-images', imagesController.getImages);
router.delete('/remove-img/:fileName', imagesController.removeImage);

router.get('/messages', contactController.getMessages);
router.delete('/delete-message/:id', contactController.deleteOne);

router.post('/insert-bookings', bookingController.insertNewBookings);
router.get('/bookings', bookingController.findAll);

export default router;