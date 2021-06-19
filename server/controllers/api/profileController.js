function profile(req, res) {
    return res.json({
        message: 'validation success',
        success: true,
        data: req.user
    });
}

export default {
    profile
};