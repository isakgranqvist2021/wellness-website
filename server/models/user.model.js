import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    administrator: { type: Boolean, default: false }
});

const UserModel = mongoose.model('User', userSchema);

async function registerUser(data) {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(data.password, salt);
        data.password = hash;
        return await new UserModel(data).save();
    } catch (err) {
        console.log(err);
        return Promise.reject('email already exists');
    }
}

async function loginUser(data) {
    try {
        const user = await UserModel.findOne({ email: data.email }).lean().exec();
        const OK = bcrypt.compareSync(data.password, user.password);

        if (OK) {
            delete user.password;
            return Promise.resolve(user);
        }

        return Promise.reject('wrong password, sorry');
    } catch (err) {
        return Promise.reject('you\'ve entered wrong information');
    }
}

async function updateUser(data) {

}

async function deleteUser(data) {

}

async function findUser(data) {
    try {
        return await UserModel.findOne({ _id: data });
    } catch (err) {
        return Promise.reject('invalid user id');
    }
}

export default { registerUser, loginUser, updateUser, deleteUser, findUser };