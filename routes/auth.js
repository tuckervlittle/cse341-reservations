const express = require('express');
const router = express.Router();
const passport = require('../middleware/passport');

// login with Google
router.get('/google',
    // #swagger.ignore = true 
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Callback 
router.get('/google/callback',
    // #swagger.ignore = true
    passport.authenticate('google', { failureRedirect: '/api-docs'}),
    (req, res) => {
        // Save user in session
        res.redirect('/');
    }
);

// Logout
router.get('/logout', (req, res) => {
  req.logout(() => {
    res.json({ message: 'Logged out' });
  });
});

module.exports = router;
