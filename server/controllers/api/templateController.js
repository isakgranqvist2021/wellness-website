import templateModel from "../../models/template.model";

async function createTemplate(req, res) {
    if (!req.body.serviceName) return res.json({ message: 'missing service name', success: false, data: null });
    if (!req.body.price) return res.json({ message: 'please include a price', success: false, data: null });

    try {
        const template = await templateModel.createTemplate(req.body);
        return res.json({ message: 'template created', success: true, data: template });
    } catch (err) {
        return res.json({ message: 'server error', success: false, data: null });
    }
}

async function findTemplates(req, res) {
    try {
        const templates = await templateModel.findTemplates();
        return res.json({ message: '', success: true, data: templates });
    } catch (err) {
        return res.json({ message: 'server error', success: false, data: null });
    }
}

async function deleteTemplate(req, res) {
    try {
        await templateModel.deleteTemplate(req.params.tid);
        return res.json({ message: 'template deleted', success: true, data: null });
    } catch (err) {
        return res.json({ message: 'unable to remove template', success: false, data: null });
    }
}


export default { createTemplate, findTemplates, deleteTemplate };