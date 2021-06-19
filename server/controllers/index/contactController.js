import contactModel from "../../models/contact.model";
import validators from '../../utils/validators';

async function contact(req, res) {
    if (!req.body.name) return res.json({
        message: 'missing name',
        success: false,
        data: null
    });
    if (!req.body.email) return res.json({
        message: 'missing email',
        success: false,
        data: null
    });
    if (!req.body.phone) return res.json({
        message: 'missing phone number',
        success: false,
        data: null
    });
    if (!req.body.message) return res.json({
        message: 'enter a message please',
        success: false,
        data: null
    });
    if (!validators.emailValidator(req.body.email)) return res.json({
        message: 'please enter a valid email',
        success: false,
        data: null
    });

    console.log(req.body);

    try {
        const result = await contactModel.contact(req.body);
        return res.json({
            message: 'your letter has been received',
            success: true,
            data: null
        });
    } catch (err) {
        return res.json({
            message: 'make sure all data is filled out correctly',
            success: false,
            data: null
        });
    }
}

export default {
    contact
};