import pageContentModel from "../../models/pageContent.model";

async function updateContent(req, res) {
    try {
        const response = await pageContentModel.updateContent(req.body);
        return res.json({ message: 'content updated', success: true, data: response });
    } catch (err) {
        return res.json({ message: 'something went wrong', success: false, data: null });
    }
}

async function uploadImg(req, res) {
    return res.json({
        message: 'file uploaded, click save to publish it.',
        success: true,
        data: req.file.filename
    });
}

async function getContent(req, res) {
    try {
        const content = await pageContentModel.getContent(req.params.field);
        return res.json({
            message: '',
            success: true,
            data: content
        });
    } catch (err) {
        return res.json({ message: 'something went wrong', success: false, data: null });
    }
}

export default { updateContent, uploadImg, getContent };