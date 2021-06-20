import bookingModel from '../../models/booking.model';
import dotenv from 'dotenv';
dotenv.config();


async function insertNewBookings(req, res) {
    try {
        const result = await bookingModel.insertNewBookings(req.body);
        return res.json({
            message: `added ${result.length} times!`,
            success: true,
            data: result
        });
    } catch (err) {
        return res.json({
            message: 'something went wrong',
            success: false,
            data: null
        });
    }
}

async function findAll(req, res) {
    try {
        const bookings = await bookingModel.findTrainingsBy({
            date: { $gte: new Date() }
        });
        return res.json({
            message: `found ${bookings.length} bookings`,
            success: true,
            data: bookings
        });
    } catch (err) {
        return res.json({
            message: 'something went wrong',
            success: true,
            data: null
        });
    }
}

async function findTrainings(req, res) {
    try {
        const programs = await bookingModel.findPrograms();
        return res.json({
            message: `found ${programs.length} programs`,
            success: true,
            data: programs
        })
    } catch (err) {
        return res.json({
            message: 'something went wrong',
            success: false,
            data: null
        });
    }
}

async function findTrainingsBy(req, res) {
    try {
        const programs = await bookingModel.findTrainingsBy({
            program: req.params.program,
            date: { $gte: new Date() }
        });
        return res.json({
            message: `found ${programs.length} programs`,
            success: true,
            data: programs
        });
    } catch (err) {
        return res.json({
            message: 'something went wrong',
            success: false,
            data: null
        });
    }
}

async function placeBooking(req, res) {
    try {
        req.body.updatedAt = new Date();
        const result = await bookingModel.placeBooking(req.body);
        console.log(result);
        return res.json({
            message: 'booking placed',
            success: true,
            data: null
        });
    } catch (err) {
        return res.json({
            message: 'something went wrong',
            success: false,
            data: null
        });
    }
}

export default {
    insertNewBookings,
    findTrainings,
    findTrainingsBy,
    placeBooking,
    findAll
};