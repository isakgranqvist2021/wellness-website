import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const pageContentSchema = new Schema({
    home: {
        title: { type: String, default: 'What is Lorem Ipsum?' },
        subtitle: { type: String, default: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.' },
        button: { type: String, default: 'Book An Appointment' },
        img: { type: String, default: 'default-home.jpg' }
    },
    bookingWindow: {
        button: { type: String, default: 'Book An Appointment' }
    }
});

const PageContentModel = mongoose.model('PageContent', pageContentSchema);

async function getContent() {
    try {
        return await PageContentModel.findOne({}).select({ _id: 0, __v: 0 }).exec();
    } catch (err) {
        return Promise.reject(err);
    }
}

async function updateContent() {
    try {

    } catch (err) {

    }
}

async function createPageContent() {
    try {
        return await new PageContentModel().save();
    } catch (err) {
        return Promise.reject(err);
    }
}

async function dropCollection() {
    try {
        return await PageContentModel.collection.drop();
    } catch (err) {
        return Promise.reject(err);
    }
}

export default { getContent, updateContent, createPageContent, dropCollection };