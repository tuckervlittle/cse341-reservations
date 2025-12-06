const routes = require('express').Router();
const area = require('./area');
const reservation = require('./reservation');
const calendar = require('./calendar');
const user = require('./user');
const swagger = require('./swagger');

// main modules
routes.use('/reservation', reservation);
routes.use('/area', area);
routes.use('/calendar', calendar);
routes.use('/user', user);

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
        <li><strong>Users</strong> Resident and admin accounts.  
            Go to <a href="/user">/user</a>
        </li>

        <li><strong>Areas</strong> Community areas available for reservation.  
            Go to <a href="/area">/area</a>
        </li>

        <li><strong>Reservations</strong> Requests, approvals, and cancellations.  
            Go to <a href="/reservation">/reservation</a>
        </li>

        <li><strong>Calendar</strong> Blocked days, available schedules.  
            Go to <a href="/calendar">/calendar</a>
        </li>
      </ul>

      <p style="font-family: Arial; color: #555;">
        Enter <a href="/api-docs">/api-docs</a> to view the complete API documentation.
      </p>
    `);
});

// swagger route
routes.use('/api-docs', swagger);

module.exports = routes;

