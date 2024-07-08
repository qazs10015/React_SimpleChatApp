module.exports.register = (req, res) => {
    console.info(req.body);
    res.send('Registration endpoint hit');
};