import userModel from "../../models/user.model";

async function register(req, res) {
    if (!req.body.name) return res.json({ message: 'you must fill out your name', success: false, data: null });
    if (!req.body.email) return res.json({ message: 'you must fill out your email', success: false, data: null });
    if (!req.body.password) return res.json({ message: 'you must fill out a password', success: false, data: null });

    try {
        await userModel.registerUser(req.body);
        return res.json({ message: 'your account has been created', success: true, data: null });
    } catch (err) {
        return res.json({ message: err, success: false, data: null });
    }
}

export default register;