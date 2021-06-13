import jwt from 'jsonwebtoken';
import userModel from '../models/user.model';
import fs from 'fs';

async function validateSession(req, res, next) {
    try {
        const token = req.headers["authorization"];
        const certificate = fs.readFileSync('cert.pem');
        const result = jwt.verify(token, certificate);
        req.user = await userModel.findUser(result.data._id);
        return next();

    } catch (err) {
        return res.json({ message: 'session expired', success: false, data: null });
    }
}

export default validateSession;