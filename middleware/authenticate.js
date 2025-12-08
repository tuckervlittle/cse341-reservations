function isAuthenticated(req, res, next) {
  if (req.session.user) return next();
  return res.status(401).json({ message: 'Not authenticated' });
}

function isAdmin(req, res, next) {
  if (req.session.user && req.session.user.role === 'admin') {
    return next();
  }
  return res.status(403).json({ message: 'Admin access required' });
}

module.exports = { isAuthenticated, isAdmin };

