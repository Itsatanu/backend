
const isJson = (req, res, next) => {
    const contentType = req.headers['content-type'];

    if (!contentType || !contentType.includes('application/json')) {
        return res.status(401).json({ success: false, message: 'Only JSON data is allowed' });
    }

    try {
        // console.log(req.body instanceof Object)
        next()
    } catch (error) {
        res.status(400).json({ success: false, message: 'Invalid JSON data' });
    }
};

export default isJson;
