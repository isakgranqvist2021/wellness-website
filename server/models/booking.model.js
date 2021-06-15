import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    template: { type: Schema.Types.ObjectId, ref: 'Template' },
    service: { type: Schema.Types.ObjectId, ref: 'Service' },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
    approved: { type: Boolean, default: false },
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

    try {
        return await new BookingModel(data).save();
    } catch (err) {
        return Promise.reject(err);
    }
}



export default { createBooking };