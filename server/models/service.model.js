import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
    serviceName: { type: String, required: true },
    instructor: { type: Schema.Types.ObjectId, ref: 'User' },
    active: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: Date.now() },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    price: { type: Number, required: true },
    date: { type: Date, required: true },
    availability: { type: Array, default: [] }
});

const ServiceModel = mongoose.model('Service', serviceSchema);

async function createService(data) {
    try {
        return await new ServiceModel(data).save();
    } catch (err) {
        return Promise.reject(err);
    }
}

async function getServices() {
    try {
        return await ServiceModel.find({});
    } catch (err) {
        return Promise.reject(err);
    }
}

export default { createService, getServices };