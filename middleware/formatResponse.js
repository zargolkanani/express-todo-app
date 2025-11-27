function formatResponse(req, res, next) {
  const oldJson = res.json;
  res.json = function(data) {
    if (res.headersSent) return;
    oldJson.call(this, {
      success: true,
      data,
      timestamp: new Date().toISOString()
    });
  };
  next();
}

module.exports = { formatResponse };
