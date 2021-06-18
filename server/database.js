import mongoose from 'mongoose';
import config from './config';
import pageContentModel from './models/pageContent.model';

const mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: true
}

async function connect() {
    try {
        await mongoose.connect(config.MONGO_URI, mongooseOptions);
        console.log('MongoDB has connected');
    } catch (err) {
        console.log(err);
    }
}

async function reload() {
    try {
        await pageContentModel.dropCollection();
        await pageContentModel.createPageContent()
        console.log('Refreshed page content');
    } catch (err) {
        console.log(err);
    }
}

export default { connect, reload };