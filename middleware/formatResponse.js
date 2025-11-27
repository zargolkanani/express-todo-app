module.exports = (req, res, next) => {
    res.success = function (data) {
        return res.json({
            success: true,
            data,
            timestamp: new Date().toISOString()
        });
    };

    next();
};
