import contactModel from "../../models/contact.model";

async function getMessages(req, res) {
    try {
        const result = await contactModel.getMessages();
        return res.json({
            message: `found ${result.length} messages`,
            success: true,
            data: result
        });
    } catch (err) {
        return res.json({
            message: `session may have expired`,
            success: false,
            data: null
        });
    }
}

async function deleteOne(req, res) {
    try {
        await contactModel.deleteOne(req.params.id);
        return res.json({
            message: 'removed message',
            success: true,
            data: null
        });
    } catch (err) {
        return res.json({
            message: `session may have expired`,
            success: false,
            data: null
        });
    }
}

export default {
    getMessages,
    deleteOne
};