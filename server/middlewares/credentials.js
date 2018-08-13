const credentials = (req, res, next) => {
  if (!req.body.username) {
    return res.status(400).json({ error: { username: 'required' } });
  }
  if (!req.body.password) {
    return res.status(400).json({ error: { password: 'required' } });
  }
  next();
};

module.exports = credentials;
