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

}

export default {
    getImages,
    removeImage
};