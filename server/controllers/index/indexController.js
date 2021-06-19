import contentModel from '../../models/content.model';
import fs from 'fs';

async function index(req, res) {
    try {
        if (req.params.accessor === 'extra') {
            const fileContent = fs.readFileSync('store.json');
            return res.json({
                message: '',
                success: true,
                data: JSON.parse(fileContent)
            });
        } else {
            const content = await contentModel.find({ accessor: req.params.accessor });

            return res.json({
                message: '',
                success: true,
                data: content[0]
            });
        }

    } catch (err) {
        return res.json({
            message: 'something went wrong..',
            success: false,
            data: null
        });
    }
}


export default {
    index
};