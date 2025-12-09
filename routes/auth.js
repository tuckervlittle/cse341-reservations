const express = require('express');
const router = express.Router();
const passport = require('../middleware/passport');

// login with Google
router.get('/google',
    // #swagger.ignore = true 
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Callback
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/not-authorized', session: true }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
  }
);

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
