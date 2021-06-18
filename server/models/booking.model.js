import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    template: { type: Schema.Types.ObjectId, ref: 'Template' },
    service: { type: Schema.Types.ObjectId, ref: 'Service' },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
    approved: { type: Boolean, default: false },
    confirmed: { type: Boolean, default: false },
    confirmKey: { type: String, required: true },
    bookingId: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true }
});

function newBookingId(length = 15) {
    const runes = 'QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm123456789'.split('');
    let id = '';

    for (let i = 0; i < length; i++) {
        id += runes[Math.floor(Math.random() * runes.length)]
    }

    return id;
}

const BookingModel = mongoose.model('Booking', bookingSchema);

async function createBooking(data) {
    data.bookingId = newBookingId();
    data.confirmKey = newBookingId(100);

    try {
        return await new BookingModel(data).save();
    } catch (err) {
        return Promise.reject(err);
    }
}

async function findBookings(filter) {
    try {
        return await BookingModel.find(filter).populate([
            { path: 'template', model: 'Template' },
            { path: 'service', model: 'Service' }
        ]);
    } catch (err) {
        return Promise.reject(err);
    }
}

async function updateMany(ids) {
    try {
        const result = await BookingModel.updateMany({ _id: { $in: ids } }, { approved: true });
        return Promise.resolve(result);
    } catch (err) {
        return Promise.reject(err);
    }
}

async function removeMany(ids) {
    try {
        const result = await BookingModel.deleteMany({ _id: { $in: ids } });
        console.log(result);
        return Promise.resolve(result);
    } catch (err) {
        return Promise.reject(err);
    }
}

async function confirmBooking(confirmKey) {
    try {
        const booking = await BookingModel.findOne({ confirmKey: confirmKey });
        booking.confirmed = true;
        return await booking.save();
    } catch (err) {
        return Promise.reject(err);
    }
}



export default { createBooking, confirmBooking, findBookings, updateMany, removeMany };