const routes = require('express').Router();

const auth = require('./auth'); 
const area = require('./area');
const reservation = require('./reservation');
const calendar = require('./calendar');
const user = require('./user');
const swagger = require('./swagger');

// Authentication routes
routes.use('/auth', auth);

// Logout route
routes.get('/logout', (req, res, next) => {
  req.logout(() => {
    req.session.destroy(() => {
      res.json({ message: 'Logged out' });
    });
  });
});

// Not authorized route
routes.get('/not-authorized', (req, res) => {
  res.status(403).send(`
    <html>
      <head>
        <title>Access Denied</title>
      </head>
      <body style="font-family:sans-serif; text-align:center; margin-top:50px;">
        <h2>Access Denied</h2>
        <p>You are not authorized. Contact admin to get access.</p>
        <button onclick="window.location.href='/'" 
                style="padding:10px 20px; font-size:16px; cursor:pointer;">
          Go Back
        </button>
      </body>
    </html>
  `);
});

// Home Route
routes.get('/',
  // #swagger.ignore = true
  (req, res) => {
    res.status(200).send(`
      <h1 style="font-family: Arial; color: #333;">
        Welcome to the Community Booking System API
      </h1>

      <p style="font-family: Arial; color: #555;">
        This API allows you to manage the reservation system for shared community areas.
      </p>

      <ul style="font-family: Arial; color: #555; line-height: 1.6;">
        <li><strong>Users</strong> Resident and admin accounts. Go to <a href="/user">/user</a>
        </li>

        <li><strong>Areas</strong> Community areas available for reservation. Go to <a href="/area">/area</a>
        </li>

        <li><strong>Reservations</strong> Requests, approvals, and cancellations. Go to <a href="/reservation">/reservation</a>
        </li>

        <li><strong>Calendar</strong> Blocked days, available schedules. Go to <a href="/calendar">/calendar</a>
        </li>
      </ul>

      <p style="font-family: Arial; color: #555;">
        Enter <a href="/api-docs">/api-docs</a> to view the complete API documentation.
      </p>

      <hr />

      <h3 style="font-family: Arial; color: #333;">Authentication</h3>

      <p style="font-family: Arial; color: #555;">
        <a href="/auth/google"
           style="font-size: 18px; padding: 8px 14px;
                  background:#4285F4; color:white;
                  border-radius:4px; text-decoration:none;">
          Login with Google
        </a>
      </p>
    `);
});

// main modules
routes.use('/reservation', reservation);
routes.use('/area', area);
routes.use('/calendar', calendar);
routes.use('/user', user);

// swagger route
routes.use('/api-docs', swagger);

module.exports = routes;

