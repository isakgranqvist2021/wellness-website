import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const contactSchema = new Schema({
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    responded: {
        type: Boolean,
        default: false
    }
});

const ContactModel = mongoose.model('Contact', contactSchema);

async function contact(data) {
    try {
        return await new ContactModel(data).save();
    } catch (err) {
        return Promise.reject(err);
    }
}

async function getMessages() {
    try {
        return await ContactModel.find({});
    } catch (err) {
        return Promise.reject(err);
    }
}

async function deleteOne(id) {
    try {
        return await ContactModel.findOneAndDelete(id);
    } catch (err) {
        return Promise.reject(err);
    }
}

export default {
    contact,
    getMessages,
    deleteOne
};