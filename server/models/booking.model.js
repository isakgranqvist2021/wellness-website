import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    program: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    bookedBy: {
        type: Array,
        default: []
    }
});

const BookingModel = mongoose.model('Booking', bookingSchema);

function newBookingId(length = 15) {
    const runes = 'QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm123456789'.split('');
    let id = '';

    for (let i = 0; i < length; i++) {
        id += runes[Math.floor(Math.random() * runes.length)]
    }

    return id;
}

async function insertNewBookings(data) {
    try {
        return await BookingModel.insertMany(data);
    } catch (err) {
        return Promise.reject(err);
    }
}

async function findPrograms() {
    try {
        return await BookingModel.find({}).select('program').exec();
    } catch (err) {
        return Promise.reject(err);
    }
}

async function findTrainingsBy(filter) {
    try {
        return await BookingModel.find(filter);
    } catch (err) {
        return Promise.reject(err);
    }
}

async function placeBooking(data) {
    try {
        return await BookingModel.findOneAndUpdate({ _id: data._id }, data);
    } catch (err) {
        return Promise.reject(err);
    }
}

export default {
    placeBooking,
    insertNewBookings,
    findPrograms,
    findTrainingsBy
};