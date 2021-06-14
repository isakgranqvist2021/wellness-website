import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import jwt from 'jsonwebtoken';

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
        const newUser = await new UserModel(data).save();
        return Promise.resolve(signData({ _id: newUser._id }));
    } catch (err) {
        console.log(err);
        return Promise.reject({ message: 'email already exists', data: 1 });
    }
}


async function loginUser(data) {
    try {
        const user = await UserModel.findOne({ email: data.email }).lean().exec();
        const OK = bcrypt.compareSync(data.password, user.password);

        if (OK) {
            delete user.password;
            return Promise.resolve(signData({ _id: user._id }));
        }

        return Promise.reject({ message: 'wrong password, sorry', data: 1 });
    } catch (err) {
        console.log(err)
        return Promise.reject({ message: 'you\'ve entered wrong information', data: 0 });
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


function signData(data) {
    const key = fs.readFileSync('key.pem');

    const token = jwt.sign({
        data: data,
        exp: Math.floor(Date.now() / 1000) + (60 * 24)
    }, key, { algorithm: 'RS256' });

    return token;
}

export default {
    registerUser,
    loginUser,
    updateUser,
    deleteUser,
    findUser
};