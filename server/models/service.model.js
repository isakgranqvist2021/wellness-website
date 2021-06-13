import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
    label: { type: String, required: true }
});

export default mongoose.model('Service', serviceSchema);

