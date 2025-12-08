const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const db = require('../models/index');
const User = db.users;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;

        // Find user in DB
        let user = await User.findOne({ email });

        // If not exists, create resident by default
        if (!user) {
          user = await User.create({
            username: email.split("@")[0],
            fullName: profile.displayName,
            email: email,
            dni: "",
            role: "resident",   
          });
        }

        return done(null, user); // send DB user to session
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

// Save user in session
passport.serializeUser((user, done) => {
  done(null, {
    username: user.username,
    role: user.role,
    email: user.email,
  });
});

// Retrieve user
passport.deserializeUser((obj, done) => {
  done(null, obj);
});

module.exports = passport;

