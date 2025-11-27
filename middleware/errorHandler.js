module.exports = (err, req, res, next) => {
    res.status(err.status || 500).json({
        success: false,
        error: {
            message: err.message || 'Server Error',
            status: err.status || 500,
            details: err.details || null
        }
    });
};
