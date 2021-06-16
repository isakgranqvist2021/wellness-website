import bookingModel from "../../models/booking.model";
import validators from '../../utils/validators';
import sendEmail from '../../utils/sendEmail';
import setupView from '../../utils/parseEjs';

import dotenv from 'dotenv';
dotenv.config();

async function createBooking(req, res) {
    if (!req.body.name) return res.json({ message: 'please enter your name', success: false, data: null });
    if (!req.body.email) return res.json({ message: 'please enter your email', success: false, data: null });
    if (!req.body.phone) return res.json({ message: 'please enter your phone number', success: false, data: null });
    if (!req.body.template) return res.json({ message: 'something fishy is going on', success: false, data: null });
    if (!req.body.service) return res.json({ message: 'something fishy is going on', success: false, data: null });
    if (!validators.emailValidator(req.body.email)) return res.json({ message: 'are you sure that\'s your email?', success: false, data: null });

    try {
        const newBooking = await bookingModel.createBooking(req.body);

        await sendEmail({
            receiver: req.body.email,
            subject: 'Please confirm your booking',
            html: setupView('email', {
                href: `${process.env.CONFIRM_URL}/confirm-booking/${newBooking.confirmKey}`,
                origin: `http://ems-training.com`,
                content: {
                    src: 'https://images.pexels.com/photos/116077/pexels-photo-116077.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
                    header: 'Please confirm your booking',
                    body: 'We have received your booking, please click the button below to confirm your booking.\
                    An instructor will preview your booking and approve it shortly. \
                    Check your email soon for a new email with a confirmation message.'
                }
            })
        });

        return res.json({ message: 'we have received your booking, please check your email for a response.', success: true, data: newBooking });
    } catch (err) {
        return res.json({ message: 'something fishy is going on', success: false, data: null });
    }
}

async function getBookings(req, res) {
    try {
        const bookings = await bookingModel.findBookings();
        return res.json({ message: '', success: true, data: bookings });
    } catch (err) {
        return res.json({ message: 'something fishy is going on', success: false, data: null });
    }
}

async function approveBooking(req, res) {
    try {
        const result = await bookingModel.approveBooking(req.body._id, req.body.approved);

        await sendEmail({
            receiver: result.email,
            subject: result.message,
            html: setupView('email', {
                href: null,
                origin: `http://ems-training.com`,
                content: {
                    src: 'https://images.pexels.com/photos/1032117/pexels-photo-1032117.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
                    header: result.message,
                    body: 'Your booking has been approved, thanks for choosing ems-training.com'
                }
            })
        });

        return res.json({
            message: result.message,
            success: true,
            data: null
        });

    } catch (err) {
        return res.json({ message: 'something fishy is going on', success: false, data: null });
    }
}

async function confirmBooking(req, res) {
    console.log(req.params.confirmKey);

    try {
        const result = await bookingModel.confirmBooking(req.params.confirmKey);
        return res.json({ message: 'booking confirmed', success: true, data: result });
    } catch (err) {
        return res.json({ message: 'something fishy is going on', success: false, data: null });
    }
}

export default { createBooking, confirmBooking, getBookings, approveBooking };