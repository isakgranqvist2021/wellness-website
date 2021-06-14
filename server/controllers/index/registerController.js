import userModel from "../../models/user.model";

async function registerController(req, res) {
    if (!req.body.name) return res.json({ message: 'you must fill out your name', success: false, data: 0 });
    if (!req.body.email) return res.json({ message: 'you must fill out your email', success: false, data: 1 });
    if (!req.body.password) return res.json({ message: 'you must fill out a password', success: false, data: 2 });

    try {
        const token = await userModel.registerUser(req.body);
        return res.json({ message: 'your account has been created', success: true, data: token });
    } catch (err) {
        return res.json({ message: err.message, success: false, data: err.data });
    }
}

export default registerController;