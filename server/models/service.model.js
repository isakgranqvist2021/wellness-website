import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
    template: {
        type: Schema.Types.ObjectId,
        ref: 'Template'
    },
    instructor: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    availability: {
        type: Array,
        default: []
    }
});

const ServiceModel = mongoose.model('Service', serviceSchema);

async function createService(data) {
    try {
        const newService = await new ServiceModel(data).save();
        return await findServiceById(newService._id);

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

async function findServiceById(id) {
    try {
        return await ServiceModel.findOne({
            _id: id
        }).populate({
            path: 'instructor',
            model: 'User',
            select: {
                password: 0
            }
        });
    } catch (err) {
        return Promise.reject(err);
    }
}

async function findServicesByTemp(tid) {
    try {
        return await ServiceModel.find({
            template: tid
        }).populate({
            path: 'instructor',
            model: 'User',
            select: {
                password: 0
            }
        });
    } catch (err) {
        console.log(err);
        return Promise.reject(err);
    }
}

async function deleteService(sid) {
    try {
        return await ServiceModel.findOneAndDelete(sid);
    } catch (err) {
        return Promise.reject(err);
    }
}


export default {
    createService,
    getServices,
    findServicesByTemp,
    deleteService
};