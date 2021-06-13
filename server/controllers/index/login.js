import userModel from "../../models/user.model";
import jwt from 'jsonwebtoken';
import config from '../../config';

async function login(req, res) {
    if (!req.body.email) return res.json({ message: 'you must enter an email', success: false, data: null });
    if (!req.body.password) return res.json({ message: 'you must enter your password', success: false, data: null });

    try {
        const user = await userModel.loginUser(req.body);
        console.log(user);
        const token = jwt.sign({
            data: { _id: user._id },
            exp: Math.floor(Date.now() / 1000) + (60 * 24)
        }, config.JWT_SECRET);
        return res.json({ message: null, success: true, data: { token: token } });
    } catch (err) {
        return res.json({ message: err, success: false, data: null });
    }
}

export default login;