import fs from 'fs';

function getImages(req, res) {
    try {
        let files = fs.readdirSync('./uploads');

        return res.json({
            message: `found ${files.length} files`,
            success: true,
            data: files
        });

    } catch (err) {
        return res.json({
            message: 'an error occured',
            success: false,
            data: null
        });
    }
}

async function removeImage(req, res) {
    // check the store.json file so image isn't being used somewhere
    // if not being used -> unlink the img
    // else do error or something
    return res.json({
        message: 'not implemented',
        success: false,
        data: null
    });
}

export default {
    getImages,
    removeImage
};