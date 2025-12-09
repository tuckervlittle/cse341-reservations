const express = require('express');
const router = express.Router();
const passport = require('../middleware/passport');

// login with Google
router.get('/google',
    // #swagger.ignore = true 
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback', (req, res, next) => {
  passport.authenticate('google', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.redirect('/not-authorized');
    req.logIn(user, (err) => {
      if (err) return next(err);
      req.session.user = user;
      return res.redirect('/');
    });
  })(req, res, next);
});

// Routes for unauthorized emails
router.get('/not-authorized', (req, res) => {
  res.status(403).send(`
    <h2>Access Denied</h2>
    <p>You are not authorized. Contact admin to get access.</p>
  `);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout(() => {
    res.json({ message: 'Logged out' });
  });
});

module.exports = router;
