function auth(req, res, next) {
  const key = req.header('x-api-key');
  if (!key || key !== process.env.API_KEY) {
    return res.status(401).json({ success: false, error: { message: 'Unauthorized', status: 401 } });
  }
  next();
}

module.exports = { auth };
