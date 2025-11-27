module.exports = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];

    if (!apiKey || apiKey !== process.env.API_KEY) {
        return next({
            status: 401,
            message: "Unauthorized: Invalid or missing API key"
        });
    }
    next();
};
