import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const templateSchema = new Schema({
    serviceName: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    },
});

const TemplateModel = mongoose.model('Template', templateSchema);

async function createTemplate(data) {
    try {
        return await new TemplateModel(data).save();
    } catch (err) {
        return Promise.reject(err);
    }
}

async function findTemplates() {
    try {
        return await TemplateModel.find({
            active: true
        });
    } catch (err) {
        return Promise.reject(err);
    }
}

async function deleteTemplate(tid) {
    try {
        return await TemplateModel.findOneAndDelete(tid);
    } catch (err) {
        return Promise.reject(err);
    }
}

async function updateTemplate(tid, update) {
    try {
        return await TemplateModel.findOneAndUpdate(tid, update);
    } catch (err) {
        return Promise.reject(err);
    }
}

export default {
    createTemplate,
    findTemplates,
    deleteTemplate,
    updateTemplate
};