import serviceModel from "../../models/service.model";

async function createService(req, res) {
    if (!req.body.serviceName) return res.json({ message: 'missing service name', success: false, data: null });
    if (!req.body.date) return res.json({ message: 'please pick a date for your service', success: false, data: null });
    if (!req.body.startTime) return res.json({ message: 'please pick a start time', success: false, data: null });
    if (!req.body.endTime) return res.json({ message: 'please pick an end time', success: false, data: null });
    if (!req.body.price) return res.json({ message: 'please include a price', success: false, data: null });

    req.body.instructor = req.user._id;

    try {
        const newService = await serviceModel.createService(req.body);
        return res.json({
            message: 'service created',
            success: true,
            data: newService
        });
    } catch (err) {
        return res.json({
            message: err,
            success: false,
            data: null
        });
    }
}

async function readService(req, res) {
    try {
        const services = await serviceModel.getServices();
        return res.json({
            message: 'loading..',
            success: true,
            data: services
        });
    } catch (err) {
        return res.json({
            message: 'server error',
            success: false,
            data: null
        });
    }
}

async function updateService(req, res) {

}

async function deleteService(req, res) {

}

export default {
    createService,
    readService,
    updateService,
    deleteService
};