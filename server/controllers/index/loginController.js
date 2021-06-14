import userModel from "../../models/user.model";

async function loginController(req, res) {
    if (!req.body.email) return res.json({ message: 'you must enter an email', success: false, data: null });
    if (!req.body.password) return res.json({ message: 'you must enter your password', success: false, data: null });

    try {
        const token = await userModel.loginUser(req.body);
        return res.json({ message: 'you have been authorized', success: true, data: token });
    } catch (err) {
        return res.json({ message: err.message, success: false, data: err.data });
    }
}

export default loginController;