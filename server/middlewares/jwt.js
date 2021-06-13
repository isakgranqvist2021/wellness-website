import jwt from 'jsonwebtoken';
import config from '../config';
import userModel from '../models/user.model';

async function validateSession(req, res, next) {
    try {
        const token = req.headers["authorization"];
        const result = jwt.verify(token, config.JWT_SECRET);
        const user = await userModel.findUser(result.data._id);
        req.user = user;
        return next();

    } catch (err) {
        return res.json({ message: 'session expired', success: false, data: null });
    }
}

export default validateSession;