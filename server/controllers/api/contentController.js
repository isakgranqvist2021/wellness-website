import contentModel from '../../models/content.model';
import fs from 'fs';

async function updateContent(req, res) {
    try {
        await contentModel.updateContent(req.body);
        return res.json({
            message: 'content updated',
            success: true,
            data: null
        });
    } catch (err) {
        return res.json({
            message: 'something went wrong',
            success: false,
            data: null
        });
    }
}


async function uploadImg(req, res) {
    return res.json({
        message: 'file uploaded, click save to publish it.',
        success: true,
        data: req.file.filename
    });
}

async function updateExtras(req, res) {
    try {
        fs.writeFileSync('store.json', JSON.stringify(req.body));
        return res.json({
            message: 'updated extras',
            success: true,
            data: null
        });
    } catch (err) {
        return res.json({
            message: 'something went wrong',
            success: false,
            data: null
        });
    }
}

async function getContent(req, res) {
    try {
        if (req.params.id === 'extra') {
            const fileContent = fs.readFileSync('store.json');
            return res.json({
                message: '',
                success: true,
                data: JSON.parse(fileContent)
            });
        } else {
            const content = await contentModel.find({ _id: req.params.id });
            return res.json({
                message: '',
                success: true,
                data: content[0]
            });
        }
    } catch (err) {
        return res.json({
            message: 'something went wrong',
            success: false,
            data: null
        });
    }
}

async function accessors(req, res) {
    try {
        const result = await contentModel.accessors();

        return res.json({
            message: '',
            success: true,
            data: result
        });

    } catch (err) {
        return res.json({
            message: 'something went wrong',
            success: false,
            data: null
        });
    }
}

export default {
    updateContent,
    uploadImg,
    getContent,
    accessors,
    updateExtras
};