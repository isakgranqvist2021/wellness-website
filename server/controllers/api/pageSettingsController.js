import pageContentModel from "../../models/pageContent.model";

async function updateSettings(req, res) {
    try {
        const response = await pageContentModel.updateContent(req.body.title, req.body.data);
        return res.json({ message: 'settings updated', success: true, data: response });
    } catch (err) {
        return res.json({ message: 'something went wrong', success: false, data: null });
    }
}

export default { updateSettings };