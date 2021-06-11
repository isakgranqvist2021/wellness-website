import mongoose from 'mongoose';
import config from './config';

const mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

async function connect() {
    try {
        await mongoose.connect(config.MONGO_URI, mongooseOptions);
        console.log('MongoDB has connected');
    } catch (err) {
        console.log(err);
    }
}

export default { connect };