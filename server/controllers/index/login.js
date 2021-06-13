import userModel from "../../models/user.model";

async function login(req, res) {
    if (!req.body.email) return res.json({ message: 'you must enter an email', success: false, data: 0 });
    if (!req.body.password) return res.json({ message: 'you must enter your password', success: false, data: 1 });

    try {
        const token = await userModel.loginUser(req.body);
        return res.json({ message: null, success: true, data: token });
    } catch (err) {
        return res.json({ message: err.message, success: false, data: err.data });
    }
}

export default login;