import userModel from "../../models/user.model";
import dotenv from 'dotenv';
dotenv.config();

async function register(req, res) {
    if (!req.body.name) return res.json({
        message: 'you must fill out your name',
        success: false,
        data: null
    });
    if (!req.body.email) return res.json({
        message: 'you must fill out your email',
        success: false,
        data: null
    });
    if (!req.body.password) return res.json({
        message: 'you must fill out a password',
        success: false,
        data: null
    });
    if (req.body.key != process.env.NEW_USER_KEY) return res.json({
        message: 'invalid key',
        success: false,
        data: null
    });

    try {
        const token = await userModel.registerUser(req.body);
        return res.json({
            message: 'your account has been created',
            success: true,
            data: token
        });
    } catch (err) {
        return res.json({
            message: err.message,
            success: false,
            data: err.data
        });
    }
}

export default {
    register
};