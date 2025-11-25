const routes = require('express').Router();

// main modules
routes.use('/reservation', require('./reservation'));
routes.use('/area', require('./area'));
routes.use('/calendar', require('./calendar'));
routes.use('/user', require('./user'));

//  swagger route
// routes.use('/', require('./swagger'));

// Home Route 
routes.get('/', (req, res) => {
  res.status(200).send(`
    <h1 style="font-family: Arial; color: #333;">
      Welcome to the Community Booking System API
    </h1>

    <p style="font-family: Arial; color: #555;">
      This API allows you to manage the reservation system for shared community areas.
    </p>

    <ul style="font-family: Arial; color: #555; line-height: 1.6;">
      <li><strong>Users</strong>  Resident and admin accounts.  
          Go to <a href="/users">/users</a>
      </li>

      <li><strong>Areas</strong> Community areas available for reservation.  
          Go to <a href="/areas">/areas</a>
      </li>

      <li><strong>Reservations</strong> Requests, approvals, and cancellations.  
          Go to <a href="/reservations">/reservations</a>
      </li>

      <li><strong>Calendar</strong>  Blocked days, available schedules.  
          Go to <a href="/calendar">/calendar</a>
      </li>
    </ul>

    <p style="font-family: Arial; color: #555;">
      Enter <a href="/api-docs">/api-docs</a> to view the complete API documentation.
    </p>
  `);
});

module.exports = routes;
