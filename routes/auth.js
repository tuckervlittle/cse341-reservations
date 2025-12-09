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

module.exports = router;
