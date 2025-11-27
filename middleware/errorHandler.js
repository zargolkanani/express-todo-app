function errorHandler(err, req, res, next) {
  console.error(err);
  if (!res.headersSent) {
    res.status(err.status || 500).json({
      success: false,
      error: { message: err.message || 'Internal Server Error', status: err.status || 500 }
    });
  }
}

module.exports = { errorHandler };
