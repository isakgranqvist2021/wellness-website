import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const pageContentSchema = new Schema({
    accessor: { type: Number, default: 100 },
    home: {
        title1: { type: String, default: 'What is Lorem Ipsum?' },
        paragraph1: { type: String, default: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.' },
        button1: { type: String, default: 'Book An Appointment' },
        img1: { type: String, default: 'default-home.jpg' }
    },
    bookingWindow: {
        button1: { type: String, default: 'Book An Appointment' }
    },
    about: {
        title1: { type: String, default: 'About' },
        title2: { type: String, default: 'What is Lorem Ipsum?' },
        paragraph1: { type: String, default: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy.Various versions have evolved over the years, sometimes by accident, sometimes on purpose(injected humour and the like).' },
        paragraph2: { type: String, default: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for \'lorem ipsum\' will uncover many web sites still in their infancy.Various versions have evolved over the years, sometimes by accident, sometimes on purpose(injected humour and the like).' },
        img1: { type: String, default: 'default-about1.jpg' },
        img2: { type: String, default: 'default-about2.jpg' }
    }
});

const PageContentModel = mongoose.model('PageContent', pageContentSchema);

async function getContent(field) {
    try {
        const pageContent = await PageContentModel.findOne({}).select({ _id: 0, __v: 0, accessor: 0 }).exec();
        if (!field) {
            return Promise.resolve(pageContent);
        } else {
            return Promise.resolve(pageContent[field]);
        }

    } catch (err) {
        return Promise.reject(err);
    }
}

async function updateContent(update) {
    try {
        const result = await PageContentModel.findOneAndUpdate({ accessor: 100 }, update).lean().exec();
        delete result.__v;
        delete result._id;
        delete result.accessor;
        return Promise.resolve(result);
    } catch (err) {
        return Promise.reject(err);
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