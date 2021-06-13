function profile(req, res) {
    console.log(req.user);

    return res.json({ message: 'validation success' });
}

export default profile;