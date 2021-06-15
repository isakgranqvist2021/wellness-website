import bookingModel from "../../models/booking.model";
import validators from '../../utils/validators';

async function createBooking(req, res) {
    if (!req.body.name) return res.json({ message: 'please enter your name', success: false, data: null });
    if (!req.body.email) return res.json({ message: 'please enter your email', success: false, data: null });
    if (!req.body.phone) return res.json({ message: 'please enter your phone number', success: false, data: null });
    if (!req.body.template) return res.json({ message: 'something fishy is going on', success: false, data: null });
    if (!req.body.service) return res.json({ message: 'something fishy is going on', success: false, data: null });
    if (!validators.emailValidator(req.body.email)) return res.json({ message: 'are you sure that\'s your email?', success: false, data: null });

    try {
        const newBooking = await bookingModel.createBooking(req.body);
        // send user an email
        return res.json({ message: 'booking has been created', success: true, data: newBooking });
    } catch (err) {
        console.log(err)
        return res.json({ message: 'something fishy is going on', success: false, data: null });
    }
}

async function approveBooking(req, res) {
    // approve a requested booking
}

export default { createBooking };